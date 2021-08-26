import React from 'react'
import Navbar from './Navbar'
import {FaArrowLeft, FaRegWindowMinimize} from 'react-icons/fa'
import {FaBars} from 'react-icons/fa'
import { Link } from 'react-router-dom';


export default function SettingMenu({ history }) {
    const goBack = () => {
        history.goBack()
    }
    const style= {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "72vh",
        width: "100%",
    }
    const btnStyle = {
        borderRadius: "15px",
        backgroundColor: "rgb(255, 255, 255, 0.8)",
        fontSize: "22px",
        fontWeight: "700",
        outline: "none",
        cursor: "pointer",
        border: "none",
        paddingBottom: "8vh",
        // boxShadow:  "5px 5px 5px gray",
        height: "20vh",
        width: "22vh",
        marginTop: "20px",
        fontFamily: "gmaget"
    }

    const onClick = () => {
        window.close();
    }
    return (
        <div className="container" style={{backgroundColor: "#0093E9",
            backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
            }}>
            <Navbar />
            <div className="titleContainer">
                <button style={{backgroundColor:"rgb(255,255,255,0)", 
                                    border:"none", 
                                    color:"white", 
                                    outline: "none", 
                                    cursor: "pointer",
                                    fontSize:"2vh"}}
                            onClick={goBack}><FaArrowLeft size="50" color="#ffff" /><br/>뒤로</button>
                <label style={{fontSize:"4vh", fontWeight:"600", color:"white"}}>관리자 설정</label>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", 
                                                    border:"none", 
                                                    color:"white", 
                                                    outline: "none", 
                                                    cursor: "pointer",
                                                    fontSize:"2vh"}}>
                    <FaBars size="50" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div style={style}>
              <button onClick={onClick} style={btnStyle}><FaRegWindowMinimize size="30" color="#8EC5FC"/><br/>프로그램 종료</button>
              {/* <button style={btnStyle}>추가 할만한게 뭐있을까</button> */}
            </div>
        </div>
    )
}