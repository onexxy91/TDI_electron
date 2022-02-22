import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import {FaArrowLeft, FaRegWindowMinimize, FaBars} from 'react-icons/fa'
import {AiOutlineHome} from 'react-icons/ai'


export default function DisitalInterview({ history }) {
    console.log(history);
    const infobtnContainer = {
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: "85%",
        height: "65vh",
    }
    const btnStyle = {
        borderRadius: "15px",
        backgroundColor: "rgb(255, 255, 255, 0.95)",
        fontSize: "22px",
        fontWeight: "700",
        outline: "none",
        cursor: "pointer",
        border: "none",
        paddingBottom: "8vh",
        // boxShadow:  "5px 5px 5px gray",
        height: "20vh",
        width: "22vh",
        marginTop: "6vh",
        fontFamily: "gmaget"
    }
    const goBack = () => {
        history.push("/")
    }
    
    return (
        <div className="container" style={{backgroundColor: "rgb(241, 237, 233)", 
        backgroundImage: 'url(./business-5268459_1280.png)'}}>
            {/*  backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"}}> */}
             <Navbar />
             <div className="titleContainer" >
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <label style={{fontSize:"38px", fontWeight:"900", color:"#ffff", marginTop:"10px"}}>디지털 인터뷰</label>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div style={infobtnContainer}>
                <Link  to={{pathname:"/interviewLogin" ,
                            state:{ interview_type:"R"} }}>
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#8EC5FC"/><br/>실전면접</button>
                </Link>
                <Link  to={{pathname:"/interviewLogin", 
                            state:{ interview_type:"P"} }}>
                    <button style={btnStyle}><FaRegWindowMinimize size="30" color="#FBAB7E"/><br/>모의면접</button>
                </Link>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            
        </div>
    )
}  