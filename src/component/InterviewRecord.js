import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import VideoRecorder from "react-video-recorder";
import renderActions from './default/render-action';
import axios from 'axios';
import { getToday } from './utilities';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




//const INTERVIEW_CODE = process.env.REACT_APP_INTERVIEW_GROUP_CODE;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;
const electron = window.require('electron');

let number = 0;
let DUTY_DETAIL_API;
if(IS_DEV === "true") {
    DUTY_DETAIL_API = "/api/testInterviewDutyDetailList.api";
}else {
    DUTY_DETAIL_API = `${PROXY}/api/testInterviewDutyDetailList.api`;
}
let filePath;
const MIME_TYPES = [
    'video/webm;codecs="vp8,opus"',
    'video/webm;codecs=h264',
    'video/webm;codecs=vp9',
    'video/webm',
    'video/mp4'
  ]
export default function InterviewRecord({ location, history }) {
    console.log("InterviewRecord", location);
    const initData = useSelector(state => state.initialReducer);
    const ADMIN_ID = initData.data.config.ADMIN_ID;
    const ipcRenderer = electron.ipcRenderer;
    const [state, setState] = useState({
        conunts: 0,
        dutyDetail: [],
        btnHide: false,
        startBtn: true,
        endBtn: false,
        recStart: false,
    })
    const videoRef = useRef();
    const audioRef = useRef();
    const divRef = useRef(HTMLDivElement);

    const containerStyle ={
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100%",
        width:"100%",
        backgroundSize: "cover",
        justifyContent: "space-between",
        overflow: "auto",
        alignItems: "center",
        userSelect: "none",
        backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"
    }
    const divStyle = {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        width:"85%",
        height: "89vh",
        overflow: "auto",
        fontFamily: "gmaget",
    }
    const videoDivStyle = {
        width: "50%",
        height: "62vh",
     
    }
    const questionDivStyle = {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: "8vh",
        backgroundColor: "rgb(255, 255, 255, 0.8)",
        marginTop: "0.5vh"

    }
    const btnStyle = {
        width:"65%",
        height: "4.5vh",
        backgroundColor: "#0093E9",
        backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        border:"none",
        color:"white",
        outline: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontFamily: "gmaget",
        fontSize: "18px",
        marginTop: "8px"
    }
    const btnDivStyle = {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "5px"
    }
    const titleStyle ={
        display: "flex",
        flexFlow: "row nowrap",
        height: "7vh",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
        //글자수 제한 해야됨slice
        //질문 container 같이 
    }
    const spanStyle ={
        whiteSpace: "pre-wrap", 
        fontSize:"20px", 
        fontWeight:"600"
    }
    const startBtnStyle = {
        // width:"65%",
        // height: "4.5vh",
        // backgroundColor: "#0093E9",
        // backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        // border:"none",
        // color:"white",
        // outline: "none",
        // cursor: "pointer",
        // borderRadius: "5px",
        // fontFamily: "gmaget",
        // fontSize: "18px"
        background: "rgb(255, 255, 255, 0.5)",
        color: "red",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        background: "rgba(227, 73, 28, 0.8)",
        outline: "none",
        border: "none",
        cursor: "pointer",
        zIndex: "5"
  
    }
    const ButtonBorderStyle = {
        border: "8px solid rgba(255, 255, 255, 0.4)",
        height: "60px",
        width: "60px",
        borderRadius: "50%"
    }
    const getDutyDetail = async () => {
        const result = await axios.get(DUTY_DETAIL_API + `?interview_duty_id=${location.state.duty.interview_duty_id}`)
        console.log(result.data.result)
        setState({
            ...state,
            dutyDetail: result.data.result,
            counts: result.data.result.length,
            btnHide: false
        })
    }
    useEffect(() => {
        if (location.state === undefined) {
            history.push("/");
            return
        }
        if (number !== 0) {
            number = 0;
        }
        filePath = `${ADMIN_ID}_${location.state.user.user_id}_${getToday()}`;
        getDutyDetail();
        //console.log("video11111", videoRef.current);
        videoRef.current.turnOnCamera();
    }, [])

    const handleStopRecording  = () => {
       
        videoRef.current.handleStopRecording();
        
        // setState({
        //     ...state,
        //     counts: state.counts -1,
        //     btnHide: false,
        //     startBtn: true
        // })
        // number = number +1;
        //divRef.current.innerHTML = "<span></span>"
       //setTimeout(() => handleStartRec(), 1500);

    }
    const buttonStatus = () => {
        setState({
            ...state,
            btnHide: true,
            startBtn: false
        })
    }
    // 버튼 정리, 다음인터뷰 눌르면 종료 후 바로 스타트 되게 settime줘서 
    const handleStartRec = () => {
        console.log(" 녹화 스타트 !!!!!! ");
        setState({
            ...state,
            startBtn: false,
            recStart: true,
        })
       // aRef.current.href = "";
       // aRef.current.download = "";

        const delayTime = Math.round(audioRef.current.duration) * 1000
        //divRef.current.innerHTML = `<span style="white-space: pre-wrap; font-weight: 600; font-size: 20px;">${state.dutyDetail[state.counts -1].interview_detail_title}</span>`
        audioRef.current.play();

        setTimeout(() => videoRef.current.handleStartRecording(), delayTime);
        setTimeout(() => buttonStatus() , delayTime + 3000);
    }

    const handleEndInterview = () => {
        console.log("면접종료");
        console.log(number);
        const detail_id = state.dutyDetail[number-1].interview_detail_id;
        console.log("detail_id", detail_id);

        let detailIDList = [];
        state.dutyDetail.map((detail, index) => {
            detailIDList.push(detail.interview_detail_id);
        })
        console.log(detailIDList);

        const user_id = location.state.user.user_id;
        const interview_id = location.state.company.interview_id;
        const interview_duty_id = location.state.duty.interview_duty_id;
        ipcRenderer.send('asynchronous-videoComplate',interview_id, interview_duty_id, 
        detailIDList, user_id, ADMIN_ID, filePath, "Y");

        history.push("/");
    }
    //console.log("dutydetail=", state.dutyDetail.length)
    console.log("counts=", state.counts)
    //console.log("number=", number);

    return (
        <div style={containerStyle}>
            <Navbar />
            <div style={divStyle}>
                <div style={titleStyle}>
                    {location.state && <span style={{whiteSpace: "pre-wrap", flex:"1", fontWeight:"600", color:"rgb(235,240,240)", fontSize:"25px"}}>{location.state.user.user_name}님 인터뷰</span>}
                    {location.state && <span style={{whiteSpace: "pre-wrap", flex:"1", fontWeight:"600", color:"rgb(235,240,240)", fontSize:"25px"}}>{location.state.company.interview_title}/{location.state.duty.interview_duty_title}</span>}
                </div>
                <div ref={divRef} style={questionDivStyle}>
                    { state.counts > 0 ? 
                        <span style={{whiteSpace: "pre-wrap", fontSize:"20px", fontWeight:"600"}}>{state.dutyDetail[number].interview_detail_title}</span>
                     : <span style={{whiteSpace: "pre-wrap", fontSize:"20px", fontWeight:"600"}}>인터뷰가 완료 되었습니다. 수고하셨습니다.</span>
                    }
                </div>
                { state.counts > 0 ? (<audio ref={audioRef} src={state.dutyDetail[number].interview_detail_file}></audio>)
                :<audio></audio>
                }
                <div style={videoDivStyle}>
                <VideoRecorder
                    renderActions={renderActions}
                    ref={videoRef}
                    isFlipped={false}
                    isReplayingVideo={false}
                    // isOnInitially
                    countdownTime={initData.data.config.INTERVIEW_COUNTDOWN_TIME}
                    timeLimit={60000} //state로 limit만들어서 초기값 주고 useeffec후 넣어주기 state.dutyDetail[state.conunts].interview_detail_time * 1000
                    mimeType="video/webm;codecs=vp8,opus"
                    constraints={{
                        audio: true,
                        video: {
                            width: { exact: 480, ideal: 480 },
                            height: { exact: 640, ideal: 640 },
                            aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
                            resizeMode: "crop-and-scale"
                        }
                    }}
                    onStopRecording={() => {
                        //console.log("onStop !");
                        number = number +1;
                        setState({
                                ...state,
                                counts: state.counts -1,
                                btnHide: false,
                                startBtn: true
                            })
                    }}
                    // onStartRecording={() => {
                    //     console.log("start", videoRef);
                    //     divRef.current.innerHTML = `<span style="white-space: pre-wrap; font-weight: 600; font-size: 20px;">${state.dutyDetail[state.counts -1].interview_detail_title}</span>
                    //     <audio src=${state.dutyDetail[0].interview_detail_file} autoPlay></audio>`
                    //     setState({
                    //         ...state,
                    //         btnHide: true
                    //     })
                      
                    //     //setTimeout(() => console.log("뿅"), 3000)
                        
                    // }}
                    onRecordingComplete={(videoBlob) => {
                        //const filePath = `${ADMIN_ID}_${location.state.user.user_id}_${getToday()}`
                        const fileName = `${number}.mp4`
                        // console.log(filePath);
                        // console.log(fileName);
                        let reader = new FileReader()
                        reader.onload = function() {
                            if (reader.readyState == 2) {
                                let buffer = new Buffer(reader.result)
                                ipcRenderer.send('asynchronous-video', filePath, fileName, buffer);
                               // ipcRenderer.send(SAVE_FILE, fileName, buffer)
                                console.log(`Saving ${JSON.stringify({ fileName, size: videoBlob.size })}`)
                            }
                        }
                        reader.readAsArrayBuffer(videoBlob)
                        
                        try {
                            videoRef.current.handleStopReplaying();
                            if (state.counts > 0) {
                                videoRef.current.turnOnCamera();  
                            }else if (state.counts === 0 ) {
                                setState({
                                    ...state,
                                    btnHide: false,
                                    startBtn: false,
                                    endBtn: true
                                })
                            }
                            // }else {
                            //     ipcRenderer.send('asynchronous-videoComplate', filePath, "N");//Y 빠르다.. 바로 안보내고 인터뷰 종료 버튼 눌렀을때 호출 
                            // }
                        } catch (error) {
                            ipcRenderer.send('asynchronous-videoComplate', filePath, "N");
                            console.log(error);
                            history.push("/")
                        }
                    }}
                /> 
                {/* {videoRef.current.isRecording === true ? (<button onClick={handleStopRecording} style={btnStyle}>다음</button>
                ) : <div></div>
                } */}
                <div style={btnDivStyle}>
                    {state.btnHide === true ? (<button onClick={handleStopRecording} style={btnStyle}>다음질문</button>)
                    :<div></div>
                    }
                    { state.startBtn === true && state.counts > 0 ? (<div style={ButtonBorderStyle}><button style={startBtnStyle} onClick={handleStartRec}></button></div>)
                    :<div></div>
                    }
                    {state.counts === 0 && state.endBtn === true ? (<button onClick={handleEndInterview} style={btnStyle}>면접종료</button>)
                    :<div></div>
                    }
                </div>
                
            </div>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
        </div>
    )
}