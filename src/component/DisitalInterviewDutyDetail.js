import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function DisitalInterviewDutyDetail ({ location, history }) {
    console.log('location', location)
    const divStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width:"100%",
        height: "79vh",
        fontFamily: "gmaget",
        overflow: "auto"
    }
   
    const boxStyle = {
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        borderRadius:"5px",
        marginTop: "1vh"
        // backgroundColor: "yellow"

    }
    const rowStyle = {
        display:"flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems:"center",
        width:"100%",
        height:"7vh",
        // backgroundColor:"yellow",
        marginBottom:"1vh",
        border: "1px solid grey",
        borderRadius: "1vh",
        backgroundColor:"rgb(255, 255, 255, 0.8)"
    }
    const rowDetailStyle = {
        display:"flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems:"center",
        width:"100%",
        height:"18vh",
        // backgroundColor:"yellow",
        marginBottom:"1vh",
        border: "1px solid grey",
        borderRadius: "1vh",
        backgroundColor:"rgb(255, 255, 255, 0.8)"
    }
    const spanTitle = {
        fontSize: "20px",
        width:"30%",
        borderRight: "thick double #32a1ce"
    }
    const spanContent = {
        fontSize: "19px",
        width:"70%",
        marginLeft: "1.5vh"
    }
    const btnStyle = {
        width:"45vh",
        height:"6vh",
        fontFamily: "gmaget",
        backgroundColor:"rgb(0, 0, 220, 0.2)",
        color:"#ffff",
        fontSize:"19px",
        border: "none",
        borderRadius: "3px",
        cursor: "pointer",
        outline: "none",
        marginTop: "1.5vh",
    }
    useEffect(() =>{
        console.log(location);
        if (location.state === undefined) {
            history.push("/");
            return;
        }
    }, [])

    const goBack = () => {
        history.push({
            pathname: "/interviewDutyList",
            state: {
                user: location.state.user,
                company: location.state.company,
                duty: location.state.duty,
                type: location.state.type
            }
        })
    }
    const schoolCode = (code) => {
        if (code == 'A') {
            return "학력무관"
        }else if (code == 'B') {
            return "고등학교졸업"
        }else if (code == 'C') {
            return "초대졸"
        }else if (code == 'D') {
            return "대졸"
        }else if (code == 'E') {
            return "석/박사"
        }
    }
    const workCode = (code) => {
        if (code == 'G') {
            return "정규직"
        }else if (code == 'B') {
            return "비정규직"
        }
    }
    const careerCode = (code) => {
        if (code == 'A') {
            return "경력무관"
        } else if (code == 'B') {
            return "신입"
        } else if (code == 'C') {
            return "경력"
        }
    }

    return (<div className="container" style={{backgroundColor: "#21D4FD",
            backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"}}>
            <Navbar />
            <div className="titleContainer" style={{height:"10vh"}}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <h1 style={{fontWeight:"900", color:"rgb(235,240,240)", width:"60%" }}>직무 상세정보 / {location.state.company.interview_title} </h1>
                {/* <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link> */}
            </div>
            <audio src='./readyCountdown.mp3' autoPlay></audio>
            <div style={divStyle}>
                <img src={location.state.company.company_image}></img>
               <div style={boxStyle}>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>직무</span>
                        <span style={spanContent}>{location.state.duty.interview_duty_title}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>연봉</span>
                        <span style={spanContent}>{location.state.duty.interview_duty_salary}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>학력</span>
                        <span style={spanContent}>{schoolCode(location.state.duty.interview_duty_school)}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>경력</span>
                        <span style={spanContent}>{careerCode(location.state.duty.interview_duty_career)}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>근무시간</span>
                        <span style={spanContent}>{location.state.duty.interview_duty_officehour}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>근무유형</span>
                        <span style={spanContent}>{workCode(location.state.duty.interview_duty_workcondition)}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>복지관계</span>
                        <span style={spanContent}>{location.state.duty.interview_duty_welfare}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>제출서류</span>
                        <span style={spanContent}>{location.state.duty.interview_duty_document}</span>
                    </div>
                    <div style={rowDetailStyle}> 
                        <span style={spanTitle}>상세내용</span>
                        <span style={spanContent}>{location.state.duty.interview_duty_detail}</span>
                    </div>
                    <div style={rowStyle}> 
                        <span style={spanTitle}>직무/근무지 사진</span>
                    </div>
                    <img style={{marginBottom:"0.7vh"}} src={location.state.duty.interview_duty_image1}></img>
                    <img style={{marginBottom:"0.7vh"}} src={location.state.duty.interview_duty_image2}></img>
                    <img style={{marginBottom:"0.7vh"}} src={location.state.duty.interview_duty_image3}></img>
                    <img style={{marginBottom:"0.7vh"}} src={location.state.duty.interview_duty_image4}></img>
                    
                    <Link style={{height:"25%"}} to ={{
                            pathname:"/interviewRecord",
                            state: {
                                user: location.state.user,
                                company: location.state.company,
                                duty: location.state.duty,
                                type:location.state.type
                            }
                         }}>
                        <button style={btnStyle}>면접진행</button>
                    </Link>
               </div>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
    </div>)
}