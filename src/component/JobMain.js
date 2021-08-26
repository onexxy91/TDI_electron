import React from 'react'
import "./jobInfo.css"
import Navbar from "./Navbar";
import {FaArrowLeft, FaRegWindowMinimize, FaBars} from 'react-icons/fa'
import {AiOutlineHome} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function JobMain({ history }) {
    console.log("shitory", history)
    const goBack = () => {
        history.goBack()
    }
    
    return ( 
        <div className="bontainer" style={{backgroundImage: 'url(./web-3967926_1280.jpg)' }}>
            <Navbar />
            <div className="titleContainer">
            <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <label style={{fontSize:"38px", fontWeight:"600", color:"#ffff"}}>채용정보</label>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div className="infobtnContainer">
                <Link className="default-link" to="/jobAll">
                    <button className="allBtn"><FaRegWindowMinimize size="30" color="#ff9999"/><br/>전체</button>
                </Link>
                <Link className="half-link" to="/youthJobInfo">
                    <button className="youthBtn"><FaRegWindowMinimize size="30" color="#ff9999"/><br/>청년</button>
                </Link>
                <Link className="half-link" to="/middleJobInfo">
                    <button className="middleBtn"><FaRegWindowMinimize size="30" color="#ff9999"/><br/>중장년</button>
                </Link>
                <Link className="half-link" to="/womenJobInfo">
                    <button className="womenBtn"><FaRegWindowMinimize size="30" color="#ff9999"/><br/>여성</button>
                </Link>
                <Link className="half-link" to="/disJobInfo">
                    <button className="disBtn"><FaRegWindowMinimize size="30" color="#ff9999"/><br/>장애인</button>
                </Link>
                <Link className="default-link" to="/smallJobInfo">
                    <button className="smallBtn"><FaRegWindowMinimize size="30" color="#ff9999"/><br/>강소기업</button>
                </Link>
            </div>
            <div className="kongchaeContainer">
                <Link className="default-link" to="/openJobInfo">
                    <button><FaRegWindowMinimize size="30" color="#ff9999"/><br/>전국 공채 속보</button>
                </Link>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            {/* <Footer /> */}
        </div>
    )
}