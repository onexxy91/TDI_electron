import React from 'react'
import Navbar from "./Navbar"
import {FaArrowLeft, FaRegWindowMinimize, FaBars} from 'react-icons/fa'
import {AiOutlineHome} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function FunFunMain({ history }) {
    const goBack = () => {
        history.goBack()
    }
    const style = {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "85%",
        height: "65vh",
        // backgroundColor:"black"
    }
    const btnStyle = {
        borderRadius: "15px",
        backgroundColor: "rgb(255, 255, 255, 0.9)",
        fontSize: "22px",
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
    return ( 
        <div className="container" style={{backgroundColor: "rgb(241, 237, 233)",
        backgroundImage: 'url(./brain-4260689_1280.jpg)'}}>
        {/* backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"}}> */}
            <Navbar />
            <div className="titleContainer">
            <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <label style={{fontSize:"38px", color:"#ffff", fontWeight:"600"}}>FUN! FUN!</label>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div style={style}>
                <Link  to="/faceDetector">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#4158D0"/><br/>안면인식 맞춤정보</button>
                </Link>
                <Link  to="/youthJobInfo">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#FBAB7E"/><br/>나만의 사원증</button>
                </Link>
                <Link  to="/middleJobInfo">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#4158D0"/><br/>크로마키 촬영</button>
                </Link>
                <Link  to="/jobTest">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#FBAB7E"/><br/>직업테스트</button>
                </Link>
                <Link  to="/disJobInfo">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#4158D0"/><br/>오늘의퀴즈</button>
                </Link>
                <Link  to="/todayEng">
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#FBAB7E"/><br/>오늘의 영어 한마디</button>
                </Link>
            </div>
            {/* <Footer /> */}
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
        </div>
    )
}