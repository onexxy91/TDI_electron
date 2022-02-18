import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaBars } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';

import axios from 'axios';
import InterviewGuideModal from './modal/InterviewGuideModal';
import { useSelector } from 'react-redux'


let INTERVIEW_LIST_API;

const INTERVIEW_CODE = process.env.REACT_APP_INTERVIEW_GROUP_CODE;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if(IS_DEV === "true") {
    INTERVIEW_LIST_API = "/api/testInterviewList.api";
}else {
    INTERVIEW_LIST_API = `${PROXY}/api/testInterviewList.api`;
}

export default function DisitalInterviewReal({ location, history}) {
    const initData = useSelector(state => state.initialReducer);
    const [isOpen, setIsOpen] = useState(true);
    const disitalBtnRef = useRef(HTMLButtonElement);
    const realtimeBtnRef = useRef(HTMLButtonElement);
    let mentRef = useRef(HTMLSpanElement);
    const [interviewList, setInterviewList] = useState([]);
    const ADMIN_ID = initData.data.config.ADMIN_ID;

    console.log("interviewList-", location);
    const divStyle = {
        display: "flex",
        flexFlow: "column nowrap",
        width:"85%",
        height: "79vh",
        overflow: "auto",
        fontFamily: "gmaget",
    }
    const btnBoxStyle = {
        display: "flex",
        flexFlow: "row nowrap",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        height:"6.3vh",
    }
    const goBack= () => {
        history.push("/disitalInterview");
    }
    const btnStyle ={
        width:"12.5vh",
        height: "4.5vh",
        backgroundColor: "rgb(245, 245, 245)",
        // backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)",
        border:"none",
        color:"#6271b9",
        outline: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize:"18px",
        fontWeight:"600",
        fontFamily: "gmaget",
        marginRight:"5px",
        marginBottom:"10px"
        //border: "2px solid #6271b9"
    }
    const btnStyle1 ={
        width:"12.5vh",
        height: "4.5vh",
        backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 50%)",
        border:"none",
        color:"white",
        outline: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize:"18px",
        fontWeight:"600",
        fontFamily: "gmaget",
        marginBottom:"10px"
        //border: "2px solid #6271b9"
    }
    const listStyle = {
        // backgroundColor:"orange",
        display: "flex",
        flexFlow: "row wrap",
        width: "100%",
        height: "68vh",
        justifyContent: "space-around"
    }
    const listBtnStyle = {
        borderRadius: "15px",
        backgroundColor: "rgb(255, 255, 255, 0.9)",
        fontSize: "22px",
        fontWeight: "700",
        outline: "none",
        cursor: "pointer",
        border: "none",
        // paddingBottom: "8vh",
        // boxShadow:  "5px 5px 5px gray",
        height: "15vh",
        width: "18vh",
        marginTop: "20px",
        fontFamily: "gmaget"
    }
    const closeNews = () => {
        setIsOpen(false);
    }
    const disitalInterviewBtn = async () => {
        const result = await axios.get(INTERVIEW_LIST_API + `?admin_group_id=${ADMIN_ID}&interview_type=R&interview_group_id=${INTERVIEW_CODE}&realtime_use=N`)
        setInterviewList(result.data.result);
        
        console.log(mentRef.current);
    }
    const realtimeInterviewBtn = async () => {
        const result = await axios.get(INTERVIEW_LIST_API + `?admin_group_id=${ADMIN_ID}&interview_type=R&interview_group_id=${INTERVIEW_CODE}&realtime_use=Y`)
        
        setInterviewList(result.data.result);
        mentRef.current.textContent = "등록된 기업이 없습니다."
        console.log(mentRef);
    }

    // console.log(interviewList)
    useEffect(() =>{
        console.log(location);
        if (location.state === undefined) {
            history.push("/");
        }
    })

    return (
        <div className="container" style={{backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"}}>
            <Navbar />
            <div className="titleContainer" style={{height:"10vh", width:"95%", display:"flex", justifyContent:"space-between" }}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <h1 style={{fontWeight:"900", color:"rgb(235,240,240)"}}>실전면접({location.state.user.user_name}님)</h1>
                {/* <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link> */}
            </div>
            <div style={divStyle}>
                <div style={btnBoxStyle}>
                    <button ref={disitalBtnRef} style={btnStyle} onClick={disitalInterviewBtn}>디지털인터뷰</button>
                    <button ref={realtimeBtnRef} style={btnStyle1} onClick={realtimeInterviewBtn}>실시간인터뷰</button>
                </div>
                <div className="interviewList">
                    {interviewList.length !== 0 ?
                    interviewList.map((list, index) => (
                        <Link style={{height:"25%"}} key={index} to ={{
                            pathname:"/interviewDutyList",
                            state: {
                                user: location.state.user,
                                company: list
                            }
                         }}>
                            <button  style={listBtnStyle}>{list.interview_title}</button></Link>
                    )) : interviewList.length === 0 ? (<div> <span ref={mentRef}>인터뷰를 선택해주세요.</span></div>)
                    : (<div></div>)
                    }   
                </div>
            </div>
            {/* <Footer /> */}
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            {/* <InterviewGuideModal isOpen={isOpen} closeNews={closeNews}/> */}
        </div>
    )
}