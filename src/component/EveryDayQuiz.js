import React, { useEffect, useRef, useState } from 'react'
import Navbar from "./Navbar"
import {FaBars, FaArrowLeft} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

let QUIZ_API;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if (IS_DEV === "true") {
    QUIZ_API = "/api/commonKnowledgeQuiz.api";
}else {
    QUIZ_API = `${PROXY}/api/commonKnowledgeQuiz.api`;
}

export default function EveryDayQuiz({history}) {
    const [state, setState] = useState({
        isLoading: true,
        answerLoading: true,
        quiz: {}, 
        answer: {}
    })
    const aRef = useRef(HTMLInputElement);
    const bRef = useRef(HTMLInputElement);
    const cRef = useRef(HTMLInputElement);
    const dRef = useRef(HTMLInputElement);

    const goBack = () => {
        history.goBack();
    }
    const contentDiv = {
        display:"flex",
        flexFlow: "column nowrap",
        alignItems:"center",
        width:"88%",
        height:"68vh",
        backgroundColor:"#ffff",
        overflow: "auto",
    }
    const btndiv = {
        display:"flex",
        flexFlow: "row nowrap",
        justifyContent:"center",
        width:"88%",
        height:"6vh",
        marginBottom:"4vh",
       
    }
    const btnStyle = {
        width:"100%",
        border:"none",
        cursor:"pointer",
        fontSize:"22px",
        fontWeight:"600",
        fontFamily: "gmaget",
        color:"#ffff",
        backgroundColor:"black"
    }
    const btnClick = async () => {
        let result;
        if (aRef.current.checked) {
            result = await axios.get(`${QUIZ_API}?qz_id=${state.quiz.qz_id}&myAnswer=${aRef.current.value}`)
            console.log(result)
        }else if (bRef.current.checked) {
            result = await axios.get(`${QUIZ_API}?qz_id=${state.quiz.qz_id}&myAnswer=${bRef.current.value}`)
            console.log(result)
        }else if (cRef.current.checked) {
            result = await axios.get(`${QUIZ_API}?qz_id=${state.quiz.qz_id}&myAnswer=${cRef.current.value}`)
            console.log(result)
        }else if(dRef.current.checked) {
            result = await axios.get(`${QUIZ_API}?qz_id=${state.quiz.qz_id}&myAnswer=${dRef.current.value}`)
            console.log(result)
        } else{
            return null;
        }

        setState({
            ...state,
            answer: result.data.result_obj,
            answerLoading: false
        })
        console.log("ansewer", result);
    } 

    const getQuiz = async () => {
        const result = await axios.get(QUIZ_API);
        console.log("quiz", result);

        setState({
            ...state,
            isLoading:false,
            quiz: result.data.result_obj
        })
    }
    const contentRender = () => {
        if (state.answerLoading) {
            return (<div></div>)
        }else {
            return (<section style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <div style={{marginTop:"2vh", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:"100%", height:"10vh", backgroundColor:"rgb(255, 255, 255, 0.1)", borderBottom:"2px solid red"}}>
                <img src="./japanese-1206509_640.jpg" style={{width:"auto"}}></img>
                <span style={{color:"red", fontSize:"2vh", fontWeight:"600"}}> 정답: ({state.quiz.qz_ans})</span>
            </div>
            <div style={{marginTop:"1vh", display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", width:"90%", backgroundColor:"rgb(255, 255, 255, 0.1)", }}>
                <span style={{fontSize:"2vh", color:"red"}}> {state.quiz.cmmntry} </span>
            </div></section>)
        }
    }
    useEffect( () => {
        getQuiz();
    }, [])

    return  ( <section>
        {state.isLoading ? (<div></div>)
        :(<div className="container" style={{backgroundColor:"rgb(200, 210, 216)"}}>
            <Navbar />
            <div className="titleContainer" style={{backgroundColor:"rgb(200, 210, 216)", height:"10vh"}}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <div style={{display:"flex", width:"35vh", justifyContent:"space-evenly", alignItems:"center"}}><label style={{fontSize:"38px", fontWeight:"900", color:"#ffff", marginTop:"10px", textShadow: "-1px 0 black, 0 3px black, 3px 0 black, 0 -1px black"}}>오늘의 퀴즈</label></div>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div style={contentDiv}>
                <img style={{width:"100%"}} src="./everydayquiz.png"></img>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:"80%", marginTop:"2vh", marginBottom:"5vh"}}>
                    <span style={{fontSize:"2vh"}}>1.{state.quiz.qz_ttl}</span>
                    <span style={{fontSize:"2vh", marginTop:"2vh"}}>{state.quiz.qz_txt}</span>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width:"80%", marginBottom:"1vh"}}>
                    <input ref={aRef} type="radio" id="a" name="drone" value="A" />
                    <label style={{fontSize:"2vh"}} htmlFor="a">{state.quiz.qz_ex_a}</label>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width:"80%", marginBottom:"1vh"}}>
                    <input  ref={bRef} type="radio" id="b" name="drone" value="B" />
                    <label style={{fontSize:"2vh"}} htmlFor="b">{state.quiz.qz_ex_b}</label>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width:"80%", marginBottom:"1vh"}}>
                    <input ref={cRef} type="radio" id="c" name="drone" value="C" />
                    <label style={{fontSize:"2vh"}} htmlFor="c">{state.quiz.qz_ex_c}</label>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width:"80%", marginBottom:"1vh"}}>
                    <input ref={dRef} type="radio" id="d" name="drone" value="D" />
                    <label style={{fontSize:"2vh"}} htmlFor="d">{state.quiz.qz_ex_d}</label>
                </div>
                {contentRender()}
            </div>
            <div style={btndiv}>
                <button style={btnStyle} onClick={btnClick}>정답제출 및 해설보기 ></button>
            </div>
            <div>
                <span>본 정보는 해커스잡(https://ejob.hackers.com/) 에서 제공합니다.</span>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>

        </div>)}
        </section>
    )
}