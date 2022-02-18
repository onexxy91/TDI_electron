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
        fontSize:"2vh", 
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
            <h1 style={{position:"absolute", marginTop:"20vh", height:"16vh", fontSize:"3vh", width:"20%"}}>세상일에 어떻게 반응하는가? </h1>
            <div style={btnboxStyle}>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(2)}> 
                    {/* <div style={btnABStyle}>A</div> */}
                    <span style={spanStyle}>바깥세계에 관심이 많은 외향적 성격</span>
                </button>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(3)} >
                    {/* <div style={btnABStyle}>B</div> */}
                    <span style={spanStyle}>내면세계에 집중하는 내향적인 성격</span>
                </button>
            </div>
            
            </div>
            {/* <button style={btnStyle}>START ></button> */}
    </section>
    )
}

