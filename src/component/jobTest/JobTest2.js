import React, {useRef, useState} from 'react'
import {FaBars, FaArrowLeft} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function JobTest2( props ) {
    console.log(props)
    const style = {
        display: "flex",
        flexDirection : "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        height: "78vh",
        
    }
    const btnboxStyle = {
        display: "flex",
        width: "25%",
        justifyContent:"center",
        height: "24vh",
        marginTop:"43vh",
        position:"absolute",
        
    }
    const BtnSelectStyle={
        display:"flex", 
        flexDirection:"column", 
        flex:"1", 
        border:"none", 
        alignItems:"center", 
        justifyContent:"center",
        backgroundColor:"rgb(255,255,255,0.1)",
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
        fontSize:"3vh", 
        fontWeight:"600", 
        marginTop:"10px"
    }
    return (<section style={style}>
            <div style={{ display: "flex",
                flexDirection : "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                height: "67vh",
                marginTop:"2vh",
                // backgroundImage:"url(./JobTestback.png)", 
                // backgroundSize: "100%",
        }}>
            <img style={{width:"30%"}} src="./jobTestback.png"></img>
            <h1 style={{position:"absolute", fontSize:"3vh", height:"16vh", marginTop:"20vh", width:"20%"}}>병원에 입원 중인 친구의 문병을 갈 때 무엇을 사가겠는가? </h1>
            <div style={btnboxStyle}>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(4)}> 
                    {/* <div style={btnABStyle}>A</div> */}
                    <span style={spanStyle}>꽃다발</span>
                </button>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(5)} >
                    {/* <div style={btnABStyle}>B</div> */}
                    <span style={spanStyle}>음료수</span>
                </button>
            </div>
            </div>
            {/* <button style={btnStyle}>START ></button> */}
    </section>
    )
}

