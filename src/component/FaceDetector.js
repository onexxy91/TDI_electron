import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Footer from './Footer'
import Navbar from './Navbar'
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as blazeface from "@tensorflow-models/blazeface";
import { drawMesh } from './utilities';
import FaceDetectorModal from './modal/FaceDetectorModal';
import GuideModal from './modal/GuideModal';
import axios from 'axios';

let WORKNET_PATH;
let JOBKOREA_PATH;
const WORKNET_CODE = process.env.REACT_APP_WORKNET_CODE;
const JOBKOREA_CODE = process.env.REACT_APP_JOBKOREA_CODE;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if(IS_DEV === "true") {
    WORKNET_PATH = "/api/getWorknetRecruit.api?recruitFlag=list";
    JOBKOREA_PATH = "/api/jobKoreaRecruitList.api?";
}else {
    WORKNET_PATH = `${PROXY}/api/getWorknetRecruit.api?recruitFlag=list`;
    JOBKOREA_PATH = `${PROXY}/api/jobKoreaRecruitList.api?`;
}


const electron = window.require('electron');
let model = undefined;
let faceDe = undefined;

export const faceDetect = async () => {
    console.log("faceDetect!!!");
    model = await blazeface.load({
         inputResoultion : {width:640, height:480},
         scale:0.8,
         maxFaces: 1
     });
 };

export default function FaceDetector({ history }) {
    const ipcRenderer = electron.ipcRenderer;
    const webcam = useRef(Webcam);
    const canvas = useRef(HTMLCanvasElement);
    const [count, setCount] = useState(3);
    let time = 3;
    let countInteval = null;
    let detecInteval = null;
    let size = [];
    const [recruitData, setRecruitData] = useState(undefined);
    const [image, setImage] = useState(undefined);
    const [selectedNews, setSelectedNeWs] = useState(true);
    const [face, setFace] = useState({
          
    });
    const [celebrity, setCelebrity] = useState({
           
    })
    const [state, setState] = useState({
        ment: "아래 시작하기 버튼을 눌러 안면인식 맞춤정보를 확인해보세요.",
        videoStyle : {
            position: "absolute",
            textAlign: "center",
            width: "85%",
            height: "60vh",
            webkitTransform:"rotateY(180deg)"
        }
    })    
    
    const style = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100%",
        width:"100%",
        backgroundSize: "cover",
        justifyContent: "space-between",
        overflow: "hidden",
        alignItems: "center",
        backgroundImage: "linear-gradient(0.5turn, #3f87a6, #ebf8e1, #f69d3c)",
        userSelect: "none",
        fontFamily: "gmaget"
    }
    const faceCtStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
        width:"90%",
        height: "66vh",
        position: "relative",
        // backgroundColor: "blue"
    }
    const btnStyle = {
        width: "35vh",
        height: "6vh",
        color: "white",
        backgroundColor: "rgba(3, 12, 24, 0.582)",
        outline: "none",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "700",
        marginBottom: "6vh",
        fontFamily: "gmaget"
    }
    const videoConstraints = {
        width: 480,
        height: 640,
        facingMode: "user",
        // backgroundColor: "black"
      };
    const mentStyle = {
        position: "absolute",
        width: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        color: "white",
        fontSize: "20px",
        fontWeight:"700",
        marginTop: "35px",
        backgroundColor: "rgba(3, 12, 24, 0.1)"
    }
    const videoStyle = {
        position: "absolute",
        textAlign: "center",
        width: "85%",
        height: "60vh",
    }
    const videoDetecingStyle = {
        position: "absolute",
        textAlign: "center",
        width: "85%",
        height: "60vh",
        backgroundColor: "rgba(255, 255, 255, 0.582)"
    }
    
    const detect = async () => {
        try {
            if (!webcam.current) return;
            // if the video is not completely uploaded, just return.
            if (webcam.current.video.readyState !== 4) {
                console.log('return')
                return;
            }
            //console.log("detect start");
    
            //get video prop
            const video = webcam.current.video;
            const videoWidth = webcam.current.video.videoWidth;
            const videoHeight = webcam.current.video.videoHeight;
            //set video
            webcam.current.video.width = videoWidth;
            webcam.current.video.height = videoHeight;
            //set canvas 
            canvas.current.width = videoWidth;
            canvas.current.height = videoHeight;
            //console.log('width complea');
            //make detections
            faceDe = await model.estimateFaces(video);
            //console.log("face", face);
            if(selectedNews && faceDe) {
                setSelectedNeWs(undefined);
            }
            //get canvas context for drawing
            if (canvas.current) {
                // console.log('ctx go');
                const ctx = canvas.current.getContext("2d");
                //console.log("ctx", ctx);
                size = drawMesh(faceDe, ctx);
            }
        } catch (error) {
            history.goBack();
        }
       
    };

    const countStart = () => {
       time = time -1
       console.log("timeout", time);
       setState({
           ...state,
        ment: `${time}초 뒤에 안면인식을 시작합니다. 멈춘 상태로 정면을 봐주세요. ` ,
        videoStyle : {
            position: "absolute",
            textAlign: "center",
            width: "85%",
            height: "60vh",
            backgroundColor: "rgba(255, 255, 255, 0.482)",
            WebkitTransform:"rotateY(180deg)"
        }
       }) 
       if (time === 0) {
        clearInterval(countInteval);
        setState({
            ...state,
         ment: "" ,
         videoStyle : {
             position: "absolute",
             textAlign: "center",
             width: "85%",
             height: "60vh",
             webkitTransform:"rotateY(180deg)"
         }
        }) 
       capture();
        }
    }

    const startBtnClick = () => {
        setState({
            ...state,
            ment: `${time}초 뒤에 안면인식을 시작합니다. 멈춘 상태로 정면을 봐주세요. ` ,
            videoStyle : {
                position: "absolute",
                textAlign: "center",
                width: "85%",
                height: "60vh",
                backgroundColor: "rgba(255, 255, 255, 0.482)",
                webkitTransform:"rotateY(180deg)"
            }
            
        })
        countInteval = setInterval(countStart, 1000);
    }
    useEffect( () => {
        detecInteval = setInterval(detect, 300);
        
        ipcRenderer.on('asynchronous-face', (event, arg) => {
            const data = JSON.parse(arg);
            if (data.faces[0].gender.value === "male") {
                data.faces[0].gender.value = "남성"
            }else if(data.faces[0].gender.value === "famale"){
                data.faces[0].gender.value = "여성"
            }else {
                data.faces[0].gender.value = "여성"
            }
            setFace({
                gender: data.faces[0].gender.value,
                age: data.faces[0].age.value
            })
            getRecruit(data.faces[0].gender.value, data.faces[0].age.value)
        })
        ipcRenderer.on('asynchronous-celeb', (event, arg) => {
            const data = JSON.parse(arg); 
            console.log(data);
            const confi = Math.ceil(data.faces[0].celebrity.confidence * 100)
            setCelebrity({
                ...celebrity,
                celebrity: data.faces[0].celebrity.value,
                confidence: confi
            })
        })
        
        return () => {
            ipcRenderer.removeAllListeners();
            clearInterval(detecInteval);
        }
    }, []);

    const restart = () => {
        setSelectedNeWs(undefined);
        setImage(undefined);
        startBtnClick();
    }
    const close = () => {
       setSelectedNeWs(undefined);
       setImage(undefined);
    }
   // 네이버 테스트 code error
    const capture = useCallback(() => {
        if (faceDe.length === 1) {
            const imageSrc = webcam.current.getScreenshot({x:264, y:388, width:150, height: 150});
            setImage(imageSrc);
            NaverApiForIpc(imageSrc);        
        } else {
            setState({
                ...state,
                ment: "화면에 얼굴을 정확히 인식후 아래 시작하기 버튼을 눌러주세요."
            })
        }
    }, [webcam]);

    const NaverApiForIpc = async (imageSrc) => {
        var matches = imageSrc.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = "";
  
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        //response.type = matches[1];
        response = Buffer.from(matches[2], 'base64');
        //console.log('response', response);
        //ipc socket 
        ipcRenderer.send('asynchronous-message', response);
    }
    const getRecruit = async (gender, age) => {
        try {
            const paseAge = parseInt(age.substring(0,2)) +2;
            let recruitData = "";
            let recruitKind = "";
            if (paseAge < 39 && gender ==="남성") {
                recruitKind = "청년"
                recruitData = await axios.get(`${WORKNET_PATH}&cur_page=1&page_size=10&pref_code=13&area_code=${WORKNET_CODE}`);
            } else if (paseAge >= 39 && gender === "남성" || gender === "여성") {
                recruitKind = "중장년"
                recruitData = await axios.get(`${WORKNET_PATH}&cur_page=1&page_size=10&pref_code=B&area_code=${WORKNET_CODE}`);
            }else if (paseAge <= 39 && gender === "여성") {
                recruitKind = "여성"
                recruitData = await axios.get(`${WORKNET_PATH}&cur_page=1&page_size=10&pref_code=12&area_code=${WORKNET_CODE}`);
            }else {
               // console.log("전체")
                recruitData = await axios.get(`${JOBKOREA_PATH}cur_page=1&page_size=10&area_code=${JOBKOREA_CODE}`);
            }
            //console.log(recruitData.data.result[5]); 
            setRecruitData(
                {
                    data: recruitData.data.result,
                    kind: recruitKind
                }
            );
        } catch (error) {
                history.goBack();
        }
       
    }

    return (
        <div style={style}>
            <Navbar />
            <p>안면인식 맞춤정보</p>
            <div style={faceCtStyle}>
                <Webcam videoConstraints={videoConstraints} 
                    style={state.videoStyle}
                    audio={false}
                    ref={webcam}
                    screenshotFormat = "image/jpeg"
                />
                <canvas ref={canvas} style={state.videoStyle}/>
                <p style={mentStyle}>{state.ment}</p>
            </div>
            <button onClick={startBtnClick} style={btnStyle}>시작하기</button>
            <FaceDetectorModal closeNews={close} selectedNews={selectedNews} />
            <GuideModal closeNews={close} restart={restart} face={face} celebrity={celebrity} image={image} recruitData={recruitData}/>
            <Footer />
        </div>
    )
}