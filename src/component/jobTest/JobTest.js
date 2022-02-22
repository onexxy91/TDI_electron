import React, {useState} from 'react'
import Navbar from "../Navbar"
import JobTest1 from './JobTest1';
import JobTest2 from './JobTest2';
import JobTest3 from './JobTest3';
import JobTest4 from './JobTest4';
import JobTest5 from './JobTest5';
import JobTest6 from './JobTest6';
import JobTest7 from './JobTest7';
import JobTest8 from './JobTest8';
import JobTest9 from './JobTest9';
import JobTest10 from './JobTest10';
import JobTest11 from './JobTest11';
import JobTest12 from './JobTest12';
import JobTest13 from './JobTest13';
import JobTest14 from './JobTest14';
import JobTest15 from './JobTest15';
import JobTest16 from './JobTest16';
import JobTest17 from './JobTest17';
import JobTest18 from './JobTest18';
import JobTest19 from './JobTest19';
import JobTest20 from './JobTest20';
import JobTest21 from './JobTest21';
import JobTest22 from './JobTest22';
import JobTest23 from './JobTest23';
import JobTest24 from './JobTest24';
import JobTest25 from './JobTest25';
import JobTest26 from './JobTest26';
import JobTest27 from './JobTest27';
import JobTest28 from './JobTest28';
import JobTest29 from './JobTest29';
import JobTest30 from './JobTest30';
import JobTest31 from './JobTest31';
import JobTest32 from './JobTest32';
import JobTest33 from './JobTest33';
import JobTest34 from './JobTest34';
import JobTest35 from './JobTest35';
import JobTest36 from './JobTest36';
import JobTest37 from './JobTest37';
import JobTest38 from './JobTest38';
import JobAType from './JobAType';
import JobBType from './JobBType';
import JobCType from './JobCType';
import JobDType from './JobDType';
import {FaBars, FaArrowLeft} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';
import { Link } from 'react-router-dom'; 

export default function JobTest({history}) {
    
    const [state, setState] = useState({
        isloading: true,
        count: 0
    })
    const goBack = () =>{
        history.goBack();
    }
    const style = {
        display: "flex",
        flexDirection : "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: "78vh",
    }
    const btnStyle = {
        backgroundColor: "rgb(255, 250, 250, 0.9)",
        fontSize: "22px",
        fontWeight: "700",
        outline: "none",
        cursor: "pointer",
        border: "none",
        // boxShadow:  "5px 5px 5px gray",
        height: "7.5vh",
        width: "30%",
        fontFamily: "gmaget",
    }
    const btnClick =  (value) => {
        console.log(value); 
       
        setState({
            isloading: false,
            count: value 
        })
    } 

    const testRender = () => {
       switch (state.count) {
           case 0:
               return (
                <section style={style}>
                    <img style={{margin:"0", width:"30%"}} src="./jobtestmain.png"></img>
                    <button onClick={() => btnClick(1)} style={btnStyle}>START ></button>
                </section>
               )
               
            case 1: 
                return (
                    <JobTest1 btnClick={btnClick} />
                )
                
            case 2:
                return (
                    <JobTest2 btnClick={btnClick} />
                )
              
            case 3:
                return (
                    <JobTest3 btnClick={btnClick} />
                )
               
            case 4: 
                return (
                    <JobTest4 btnClick={btnClick} />
                )
               
            case 5: 
                return (
                    <JobTest5 btnClick={btnClick} />
                )
                   
            case 6:
                return (
                    <JobTest6 btnClick={btnClick} />
                )
                
            case 7:
                return (
                    <JobTest7 btnClick={btnClick} />
                )
                
            case 8:
                return (
                    <JobTest8 btnClick={btnClick} />
                )
                
            case 9:
                return (
                    <JobTest9 btnClick={btnClick} />
                )
                 
            case 10:
                return (
                    <JobTest10 btnClick={btnClick} />
                )
                
            case 11:
                return (
                    <JobTest11 btnClick={btnClick} />
                )
                
            case 12:
                return (
                    <JobTest12 btnClick={btnClick} />
                )
                
            case 13:
                return (
                    <JobTest13 btnClick={btnClick} />
                )
                
            case 14:
                return (
                    <JobTest14 btnClick={btnClick} />
                )
                
            case 15:
                return (
                    <JobTest15 btnClick={btnClick} />
                )
                
            case 16:
                return (
                    <JobTest16 btnClick={btnClick} />
                )
                
            case 17:
                return (
                    <JobTest17 btnClick={btnClick} />
                )
                
            case 18:
                return (
                    <JobTest18 btnClick={btnClick} />
                )
                
            case 19:
                return (
                    <JobTest19 btnClick={btnClick} />
                )
                
            case 20:
                return (
                    <JobTest20 btnClick={btnClick} />
                )
                
             case 21:
                return (
                    <JobTest21 btnClick={btnClick} />
                )
                
             case 22:
                return (
                    <JobTest22 btnClick={btnClick} />
                )
                
             case 23:
                return (
                    <JobTest23 btnClick={btnClick} />
                )
                
             case 24:
                return (
                    <JobTest24 btnClick={btnClick} />
                )
                
             case 25:
                return (
                    <JobTest25 btnClick={btnClick} />
                )
                
             case 26:
                return (
                    <JobTest26 btnClick={btnClick} />
                )
                
             case 27:
                return (
                    <JobTest27 btnClick={btnClick} />
                )
                
             case 28:
                return (
                    <JobTest28 btnClick={btnClick} />
                )
                
             case 29:
                return (
                    <JobTest29 btnClick={btnClick} />
                )
                
             case 30:
                return (
                    <JobTest30 btnClick={btnClick} />
                )
                
             case 31:
                return (
                    <JobTest31 btnClick={btnClick} />
                )
                
            case 32:
                return (
                    <JobTest32 btnClick={btnClick} />
                )
                
            case 33:
                return (
                    <JobTest33 btnClick={btnClick} />
                )
                
            case 34:
                return (
                    <JobTest34 btnClick={btnClick} />
                )
                
            case 35:
                return (
                    <JobTest35 btnClick={btnClick} />
                )
                
            case 36:
                return (
                    <JobTest36 btnClick={btnClick} />
                )
                
            case 37:
                return (
                    <JobTest37 btnClick={btnClick} />
                )
                
            case 38:
                return (
                    <JobTest38 btnClick={btnClick} />
                )
                
           case 100:
               return(
                   <JobAType btnClick={btnClick} />
               ) 
               
            case 200:
               return(
                   <JobBType btnClick={btnClick} />
               ) 
               
            case 300:
               return(
                   <JobCType btnClick={btnClick} />
               ) 
               
            case 400:
               return(
                   <JobDType btnClick={btnClick} />
               ) 
               
       }
    }
    
    return (
        <div className="container" style={{backgroundColor:"rgb(200, 210, 216)"}}>
            <Navbar />
            <div className="titleContainer" style={{backgroundColor:"rgb(200, 210, 216)", height:"10vh"}}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <div style={{display:"flex", width:"35vh", justifyContent:"space-evenly", alignItems:"center"}}><label style={{fontSize:"38px", fontWeight:"900", color:"#ffff", marginTop:"10px", textShadow: "-1px 0 black, 0 3px black, 3px 0 black, 0 -1px black"}}>직업테스트</label></div>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            {testRender()}
            <div>
                <span>본 정보는 잡코리아(www.jobkorea.co.kr) 에서 제공합니다.</span>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
        </div>
    )
}