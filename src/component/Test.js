import React, { useRef } from 'react'
import Webcam from 'react-webcam';
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as facemesh from '@tensorflow-models/facemesh';
import { drawMesh } from './utilities';

export default function Test() {
    const webcam = useRef(Webcam);
    const canvas = useRef(HTMLCanvasElement);


      
  const faceDetect = async () => {
    const model = await facemesh.load({
        inputResoultion : {width:640, height:480},
        scale:0.8
    });
    setInterval( () => {
        detect(model);
    }, 500)
  };

  const detect = async (model) => {
    if (!webcam.current) return;
    console.log("facedector2", webcam.current);
    // if the video is not completely uploaded, just return.
    if (webcam.current.video.readyState !== 4) {
      return;
    }
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

    //make detections
    const face = await model.estimateFaces(video);
    console.log("face", face);

    //get canvas context for drawing
    const ctx = canvas.current.getContext("2d");
    console.log("ctx", ctx);
    drawMesh(face, ctx);

  };

  const onclick = () => {
    faceDetect();
  }
  
    return (
        <div>
            <Webcam ref={webcam} style={
                {
                    position: "absolute",
                    marginLeft: "auto",
                    marginRigth: "auto",
                    left: 0, 
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
                    width: 640,
                    height: 480
                }
            }/>
            <canvas ref={canvas} style={
                {
                    position: "absolute",
                    marginLeft: "auto",
                    marginRigth: "auto",
                    left: 0, 
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
                    width: 640,
                    height: 480
                }
            }/>
            <button onClick={onclick}>시작하기</button>
        </div>
        
    )
}