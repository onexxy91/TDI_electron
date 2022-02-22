import React, { useState } from 'react'
import Navbar from "./Navbar"
import {FaArrowLeft, FaRegWindowMinimize, FaBars} from 'react-icons/fa'
import {AiOutlineHome} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import ForbiddenModal from './modal/ForbiddenModal';

export default function FunFunMain({ history }) {
    const [isOpen, setIsOpen] = useState(false);
    const goBack = () => {
        history.goBack()
    }
    const style = {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "40%",
        height: "65vh",
        // backgroundColor:"black"
    }
    const btnStyle = {
        borderRadius: "15px",
        backgroundColor: "rgb(255, 255, 255, 0.9)",
        fontSize: "2vh",
        fontWeight: "700",
        outline: "none",
        cursor: "pointer",
        border: "none",
        paddingBottom: "8vh",
        // boxShadow:  "5px 5px 5px gray",
        height: "18vh",
        width: "22vh",
        fontFamily: "gmaget"
    }
    const modalOpen = () => {
        setIsOpen(true);
    }
    const modalClose = () => {
        setIsOpen(false);
    }
    return ( 
        <div className="container" style={{backgroundColor: "rgb(241, 237, 233)",
        backgroundImage: 'url(./brain-4260689_1280.jpg)'}}>
        {/* backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"}}> */}
            <Navbar />
            <div className="titleContainer">
            <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <label style={{fontSize:"2vh", color:"#ffff", fontWeight:"600"}}>FUN! FUN!</label>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div style={style}>
                <Link  to="/faceDetector">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#4158D0"/><br/>안면인식 맞춤정보</button>
                </Link>
                {/* <Link  to="/youthJobInfo"> */}
                    <button onClick={modalOpen} style={btnStyle}><FaRegWindowMinimize size="30" color="#FBAB7E"/><br/>나만의 사원증</button>
                {/* </Link> */}
                {/* <Link  to="/middleJobInfo"> */}
                    <button onClick={modalOpen} style={btnStyle}><FaRegWindowMinimize size="30" color="#4158D0"/><br/>크로마키 촬영</button>
                {/* </Link> */}
                <Link  to="/jobTest">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#FBAB7E"/><br/>직업테스트</button>
                </Link>
                <Link  to="/everyQuiz">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#4158D0"/><br/>오늘의퀴즈</button>
                </Link>
                <Link  to="/todayEng">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#FBAB7E"/><br/>오늘의 영어 한마디</button>
                </Link>
            </div>
            
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            <ForbiddenModal
                isOpen = {isOpen}
                close = {modalClose}
                message= "업데이트 또는 지원불가 메뉴입니다."
                />
        </div>
    )
}