import React, {useRef, useState} from 'react'
import {FaBars, FaArrowLeft} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function JobTest1( props ) {
    console.log(props)
    const style = {
        display: "flex",
        flexDirection : "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        height: "76vh",
       
    }
    const btnboxStyle = {
        display: "flex",
        width: "75%",
        height: "20vh",
        
    }
    const BtnSelectStyle={
        display:"flex", 
        flexDirection:"column", 
        flex:"1", 
        border:"grey 1px solid", 
        alignItems:"center", 
        justifyContent:"center",
        backgroundColor:"white",
        cursor: "pointer",
        fontSize: "large",
        fontFamily: "gmaget",
    }
    const btnABStyle ={
        border:"none", 
        backgroundColor:"pink", 
        color:"#ffff", 
        borderRadius:"50%", 
        width:"25%", 
        height:"5vh",
        fontSize:"30px",
        fontWeight:"600",
    }
    const spanStyle = {
        fontSize:"20px", 
        fontWeight:"600", 
        marginTop:"8px"
    }
    return (<section style={style}>
            <div style={{ display: "flex",
        flexDirection : "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "72vh",
        backgroundImage:"url(./clipboard-3827867_1280.png)", 
        backgroundSize: "100%", 
        }}>
            {/* <img style={{margin:"0", width:"80%"}} src="./clipboard-307332_1280.png"></img> */}
            <span style={{position:"absolute", marginTop:"30vh", borderBottomColor: "yellow", borderBottomStyle:"solid", borderBottomWidth:"4px"}}>테스트로 알아보는 나에게 맞는 직업</span>
            <h1 style={{fontSize:"40px", marginTop:"2vh", width:"75%"}}>세상일에 어떻게 반응하는가?</h1>
            <div style={btnboxStyle}>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(2)}> 
                    <div style={btnABStyle}>A</div>
                    <span style={spanStyle}>바깥세계에 관심이 많은 외향적 성격</span>
                </button>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(3)} >
                    <div style={btnABStyle}>B</div>
                    <span style={spanStyle}>내면세계에 집중하는 내향적인 성격</span>
                </button>
            </div>
            </div>
            {/* <button style={btnStyle}>START ></button> */}
    </section>
    )
}

