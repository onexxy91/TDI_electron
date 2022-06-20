import React from 'react'
import { FaArrowLeft, FaBars, FaCheck, FaCheckCircle } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'


export default function Signup({ history }) {
    const divStyle = {
        display: "flex",
        width: "100%",
        height: "70vh",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "FontAwesome"
        // backgroundColor: "aqua",
        // backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
        
    }
    const infoStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "38%",
        height: "60vh",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius:"5px",
        marginTop:"3vh"
    }
    const goBack = () => {
        history.goBack();
    }
    const textStyle = {
        fontSize:"20px",
        whiteSpace: "pre-wrap",
        width:"100%",
        color: "rgb(90, 92, 80)",
        fontFamily: "gmaget",
        marginLeft: "1ch"
    }
    const btnStyle ={
        width:"20vh",
        height: "4.5vh",
        backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)",
        border:"none",
        color:"white",
        outline: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontFamily: "gmaget"
    }
    return (
        <div className="container" style={{backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"}}>
            <Navbar />
            <div className="titleContainer" style={{height:"15vh"}}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <h1 style={{fontWeight:"900", color:"rgb(235,240,240)"}}>회원가입</h1>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <p style={{margin:"0", marginBottom:"1vh"}}><FaCheckCircle size="25" /> 개인정보 제공 동의</p>
            <div style={divStyle}>
                <div style={infoStyle}>
                    <span style={textStyle}><strong>1) 수집하려는 개인정보 항목</strong><br/>  성명, 이메일, 주소, 연락처</span>
                    <span style={textStyle}><strong>2) 어떤 목적으로 수집하고 이용하는지</strong><br/>  디지털 인터뷰 메뉴 사용 및 면접 결과 안내</span>
                    <span style={textStyle}><strong>3) 이용기간</strong><br/> 법령에 따른 보존기간 또는 탈퇴 후 7일 이내</span>
                    <span style={textStyle}><strong>4) 이노스피치 에서 수집하는 개인정보 제공동의에</strong> <br/> 대해 동의하지않을 수 있으나, 이 경우 디지털인터뷰<br/> 메뉴 관련 서비스 이용이 제한됩니다.</span>
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around"}}>
                        <Link to="/signupMain"><button style={btnStyle}><FaCheck size="20" /> 동의하기</button></Link>
                        <Link to="/" ><button style={btnStyle}>동의하지않음</button></Link>
                    </div>
                </div>
            </div>
 
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
        </div>
    )
}