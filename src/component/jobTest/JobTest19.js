import React, {useRef, useState} from 'react'

export default function JobTest19( props ) {
    console.log(props)
    const style = {
        display: "flex",
        flexDirection : "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        height: "75vh",
       
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
        fontWeight:"600"
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
            <h1 style={{fontSize:"40px", marginTop:"2vh", width:"75%"}}>다른여행이나 친구들 끼리 모임에 언제나 초대받는다.</h1>
            <div style={btnboxStyle}>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(23)}> 
                    <div style={btnABStyle}>A</div>
                    <span style={spanStyle}>YES</span>
                </button>
                <button style={BtnSelectStyle} onClick={()=> props.btnClick(20)}>
                    <div style={btnABStyle}>B</div>
                    <span style={spanStyle}>NO</span>
                </button>
            </div>
            </div>
            {/* <button style={btnStyle}>START ></button> */}
    </section>
    )
}

