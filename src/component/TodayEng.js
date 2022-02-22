import React, { useEffect, useRef, useState } from 'react'
import {FaBars, FaArrowLeft} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar"
import axios from 'axios';

let TodayEngApi;
const ISDEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if(ISDEV === "true") {
    TodayEngApi = "/api/getTodayExpression.api"
}else {
    TodayEngApi = `${PROXY}/api/getTodayExpression.api`
}
export default function TodayEng({ history }) {
    const comentRef = useRef(HTMLSpanElement);
    const expressRef = useRef(HTMLSpanElement);
    const meanRef = useRef(HTMLSpanElement);

    const [state, setState] = useState({
        loading: true,
        todayEng:{}
    });
    const [count, setCount] = useState(0);

    const divStyle = {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent:"space-evenly",
        alignItems: "center",
        height: "71vh",
        width: "100%",
        backgroundColor: "rgb(35, 210, 216)",
        
    }
    const contentStyle = {
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        height:"18vh",
        width:"95%",
    }
    const buttonStyle={
        height: "7vh",
        backgroundColor: "rgb(85, 81, 81, 0.1)",
        color: "white",
        outline: "none",
        cursor: "pointer",
        borderRadius: "1vh",
        width: "25%",
        fontFamily: "gmaget",
        fontSize: "18px",
        fontWeight: "600",
    }
    const goBack = () => {
        history.goBack();
    }
    const getTodayEng = async () => {
        const result = await axios.get(TodayEngApi);
        //console.log("result", result);

        setState({
            loading: false,
            todayEng: result.data.result
        })
    }
    const buttonclick = () => {
        if (count === 0) {
            comentRef.current.textContent = "활용가능한 표현으로는~"
            expressRef.current.textContent = state.todayEng.exam_1;
            meanRef.current.textContent = state.todayEng.exam_1_meaning;

            setCount(count +1);
        } else if(count === 1) {
            comentRef.current.textContent = "활용가능한 표현으로는~"
            expressRef.current.textContent = state.todayEng.exam_2;
            meanRef.current.textContent = state.todayEng.exam_2_meaning;
            setCount(count +1);
        }else if (count === 2){
            comentRef.current.textContent = "오늘의 한마디는 ?"
            expressRef.current.textContent = state.todayEng.expression;
            meanRef.current.textContent = state.todayEng.meaning;
            setCount(0);
        }
        //console.log(expressRef.current.textContent);
    }
    useEffect(() => {
        getTodayEng();
        
    },[])
    console.log("?", state.todayEng);
    return (<section>
        {state.loading ? (<div style={{backgroundColor:"rgb(35, 210, 216)"}}></div>)
        : (<div className="container" style={{backgroundColor:"rgb(170, 255, 255)"}}>
            <Navbar />
                <div className="titleContainer" style={{backgroundColor:"rgb(35, 210, 216)", height:"18vh"}}>
                    <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                    <div style={{display:"flex", width:"40vh", justifyContent:"center", alignItems:"center"}}>
                        <label style={{fontSize:"42px", fontWeight:"900", color:"#ffff", marginTop:"10px", marginRight:"5px", textShadow: "-1px 0 black, 0 3px black, 3px 0 black, 0 -1px black"}}>오늘의</label>
                        <label style={{fontSize:"42px", fontWeight:"900", color:"rgb(230, 230, 70)", marginTop:"10px", marginLeft:"10px", textShadow: "-1px 0 black, 0 3px black, 3px 0 black, 0 -1px black"}}> 영어한마디</label>
                    </div>
                    <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
                </div>
                <div style={divStyle}>
                    <div className="speech-bubble" > 
                        <span style={{fontSize:"26px"}} ref={comentRef}>오늘의 한마디는 ?</span>                       
                        <div style={contentStyle}>
                            <span ref={expressRef} style={{whiteSpace: "pre-wrap", fontWeight:"700", fontSize:"4vh", color:"black", borderBottom: "yellow 7px solid"}}>{state.todayEng.expression}</span>
                        </div>
                        <div style={contentStyle}>
                            <span ref={meanRef} style={{whiteSpace: "pre-wrap", fontWeight:"700", fontSize:"4vh", color:"black"}}>{state.todayEng.meaning}</span>
                        </div>
                    </div>
                    <div style={{display:"flex", width:"95%", justifyContent:"flex-end"}}>
                        <button onClick={buttonclick} style={buttonStyle}>더 알아볼까요?</button>
                    </div>
                </div>
                <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            </div>
        )
        }
    </section> 
    )
}