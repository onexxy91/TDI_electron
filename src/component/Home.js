import React, { useEffect, useRef } from "react"
import "./home.css"
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { MdHelpOutline } from 'react-icons/md';
import CenterNewsSlide from "./CenterNewsSlide";
// import Slide from "./Slide"
//import background_imag from "../univ_background_2.png";
//import { BiTimer } from 'react-icons/bi';
//import { FaRegPaperPlane } from 'react-icons/fa';
//import { RiLightbulbFlashLine, RiFileList2Line } from 'react-icons/ri';


const btnLink = new Array('/jobInfo'
    , '/realJobInfo' 
    , '/centerNews'
    , '/funfun'
    , '/customAPI1'
    , '/customAPI2'); 

export default function Home() {
    const state = useSelector(state => state.initialReducer);
    console.log("home", state.data.placard);
    const divRef = useRef(HTMLDivElement);
    const custom_API_FIR = state.data.config.CUSTOM_API_FIR;
    const custom_API_FIR_NAME = state.data.config.CUSTOM_API_FIR_NAME;
    const custom_API_SEC = state.data.config.CUSTOM_API_SEC;
    const custom_API_SEC_NAME = state.data.config.CUSTOM_API_SEC_NAME;

    const style ={
        display: "flex",
        height: "5vh",
        width: "95%",
        justifyContent: "flex-end",
        alignItems:"center",
    }

    let count = 0;
    const univFile = state.data.univFile[0];
    const placard = state.data.placard;
    //const url = 'https://naveropenapi.apigw.ntruss.com/vision/v1/face'

    const imgs = ['./interview.png']
    const imageSlide = () => {
        //console.log("실행?", count);
        if (count > (imgs.length -1)) {
            count = 0;
        }

        divRef.current.style.cssText = `background-image: url(${imgs[count]});`
        count = count +1
       
    }
useEffect(() => {
    //console.log(divRef);
    let slideInterval = setInterval(imageSlide, 3000);

    return () => {
        clearInterval(slideInterval);
    }

},[])

    return <div ref={divRef} className="container" style={{backgroundImage: 'url(./interview.png)' }}>
       <Navbar />
        <div className="placardContainer">
               {/* <Slide /> */}
        </div>
        <div className="centerSlide">
            <Link style={{textDecoration: "none",}} to="/centerNews"><CenterNewsSlide /></Link>
        </div>
        {/* <div className="menuBtnContainer">
            {univFile.menu_btn_arr.map((menuBtn, index)=> (
                // <Link key={index} to={btnLink[index]}><button><img src={menuBtn.menu_image}></img></button></Link>
                <Link key={index} to={btnLink[index]}><button>채용정보</button></Link>
            ))}
        </div> */} 
         <div className="menuBtnContainer">    
            {/* <Link to={btnLink[0]}><button><MdAssignmentInd size="50" color="#ffff"></MdAssignmentInd><br/>채용정보</button></Link> */}
            <Link to={btnLink[0]}><button><img  src={univFile.menu_btn_arr[0].menu_image}></img></button></Link>
            <Link to={btnLink[1]}><button><img src={univFile.menu_btn_arr[1].menu_image}></img></button></Link>
            <Link to={btnLink[2]}><button><img  src={univFile.menu_btn_arr[2].menu_image}></img></button></Link>
            {/* <Link to={btnLink[1]}><button><BiTimer size="50" color="#ffff"></BiTimer><br/>시간제일자리</button></Link> */}
            {/* <Link to={btnLink[2]}><button><FaRegPaperPlane size="40" color="#ffff"></FaRegPaperPlane><br/>공지사항</button></Link> */}
        </div> 
        <div className="menuBtnContainer1">    
            {/* <Link to={btnLink[3]}><button><RiLightbulbFlashLine size="50" color="#ffff"/><br/>FUN! FUN!</button></Link> */}
            <Link to={btnLink[3]}><button><img style={{width:"77%"}} src={univFile.menu_btn_arr[3].menu_image}></img></button></Link>
            {/* <Link to={btnLink[2]}><button><img  style={{width:"77%"}} src={univFile.menu_btn_arr[2].menu_image}></img></button></Link> */}
            {custom_API_FIR !== "" ?
                <Link to={{ pathname:btnLink[4],
                            state:{api_url: custom_API_FIR} }}><button><img style={{width:"74%"}} src={univFile.menu_btn_arr[4].menu_image}></img></button></Link>
                :<button style={{ display: "none"}}></button>
            }
            {custom_API_SEC !== "" ? 
                <Link to={{pathname:btnLink[5],
                            state:{api_url: custom_API_SEC} }}><button><img style={{width:"73%"}}src={univFile.menu_btn_arr[5].menu_image}></img></button></Link>
                :<button style={{ display: "none"}}></button>
            }
        </div>
        <div className="contentBtnContainer">
            <div className="sub1">
                <span style={{color:"white", fontSize: "large"}}>디지털면접</span>
                <Link to="/disitalInterview"><button><img src="./disitalImage.png"></img></button></Link>
                <span style={{color:"white", fontSize: "large"}}>FUN!FUN!</span>
                <Link to="/faceDetector"><button><img src="./faceDetecImage.png"></img></button></Link>
            </div>
            <div className="sub2">
                <span style={{color:"white", fontSize: "large"}}>{state.data.config.ADMIN_NAME} 소개</span>
                <Link to="/centerintro"><button><img src={univFile.center_menu_img}></img></button></Link>
            </div>
        </div>
            {/* <Link to="/"><button className="centerBtn"><CenterNewsSlide /></button></Link>  */}
       
       <div style={style}>
           <Link to="/" style={{display:"flex", alignItems:"center", textDecoration:"none"}}><span style={{color:"white"}}>이용안내</span><MdHelpOutline size="32" color="#ffff"/></Link>
       </div>
    </div>
}