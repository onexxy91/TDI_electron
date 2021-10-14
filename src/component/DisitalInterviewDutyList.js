import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaBars } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';
import axios from 'axios';

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;
const INTERVIEW_CODE = process.env.REACT_APP_INTERVIEW_GROUP_CODE;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

let INTERVIEWDUTY_LIST_API;
if(IS_DEV === "true") {
    INTERVIEWDUTY_LIST_API = "/api/testInterviewDutyList.api";
}else {
    INTERVIEWDUTY_LIST_API = `${PROXY}/api/testInterviewDutyList.api`;
}

export default function DisitalInterviewDutyList({ location, history}) {
    const [dutyList, setDutyList] = useState([]);
    console.log("interviewDutyList-", location)
    const divStyle = {
        display: "flex",
        flexFlow: "column nowrap",
        width:"85%",
        height: "79vh",
        overflow: "auto",
        fontFamily: "gmaget",
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
    const goBack = () => {
        history.push({
            pathname: "/interviewCompany",
            state: {
                user: location.state.user,
                company: location.state.company
            }
        })
    }

    const getdutyList = async () => {
        const result = await axios.get(INTERVIEWDUTY_LIST_API + `?admin_group_id=${ADMIN_ID}&interview_group_id=${INTERVIEW_CODE}&interview_id=${location.state.company.interview_id}`);
        console.log(result);
        setDutyList(result.data.result);
    }

    useEffect(() =>{
        console.log(location);
        if (location.state === undefined) {
            history.push("/");
            return;
        }
        getdutyList();
    }, [])

    return (
        <div className="container" style={{backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"}}>
            <Navbar />
            <div className="titleContainer" style={{height:"10vh"}}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <h1 style={{fontWeight:"900", color:"rgb(235,240,240)", width:"75%" }}>직무선택 / {location.state.company.interview_title}</h1>
                {/* <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link> */}
            </div>
            <div style={divStyle}>
                <div className="interviewList">
                   {dutyList.map((duty, index) => (
                        <Link key={index} to ={{
                            pathname:"/interviewRecord",
                            state: {
                                user: location.state.user,
                                company: location.state.company,
                                duty: duty
                            }
                         }}>
                            <button  style={listBtnStyle}>{duty.interview_duty_title}</button></Link>
                   ))
                   }
                </div>
            </div>
            {/* <Footer /> */}
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
        </div>
    )
}