import React, { useEffect, useRef } from "react"
import "./home.css"
import Slide from "./Slide"
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
//import background_imag from "../univ_background_2.png";
import Footer from "./Footer";
import { BiTimer } from 'react-icons/bi';
import { FaRegPaperPlane } from 'react-icons/fa';
import { MdAssignmentInd, MdHelpOutline } from 'react-icons/md';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import CenterNewsSlide from "./CenterNewsSlide";


const btnLink = new Array('/jobInfo'
    , '/realJobInfo' 
    , '/centerNews'
    , '/funfun'
    , '/custom1'
    , '/custom2'); 

export default function Home() {

const state = useSelector(state => state.initialReducer);
console.log("home", state.data.placard);
const divRef = useRef(HTMLDivElement);

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
    const url = 'https://naveropenapi.apigw.ntruss.com/vision/v1/face'

    const imgs = ['./KakaoTalk_1.png', './KakaoTalk_2.png', './backSample1.png']
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

    return <div ref={divRef} className="container" style={{backgroundImage: 'url(./KakaoTalk_1.png)' }}>
       <Navbar />
        <div className="placardContainer">
               {/* <Slide /> */}
        </div>
        <div className="centerSlide">
            <Link style={{textDecoration: "none",}}to="/centerNews"><CenterNewsSlide /></Link>
        </div>
        {/* <div className="menuBtnContainer">
            {univFile.menu_btn_arr.map((menuBtn, index)=> (
                // <Link key={index} to={btnLink[index]}><button><img src={menuBtn.menu_image}></img></button></Link>
                <Link key={index} to={btnLink[index]}><button>채용정보</button></Link>
            ))}
        </div> */}
         <div className="menuBtnContainer">    
            <Link to={btnLink[0]}><button><MdAssignmentInd size="40" color="#ffff"></MdAssignmentInd><br/>채용정보</button></Link>
            <Link to={btnLink[1]}><button><BiTimer size="42" color="#ffff"></BiTimer><br/>시간제일자리</button></Link>
            <Link to={btnLink[2]}><button><FaRegPaperPlane size="30" color="#ffff"></FaRegPaperPlane><br/>센터소식</button></Link>
        </div>
        <div className="menuBtnContainer1">    
            <Link to={btnLink[3]}><button><RiLightbulbFlashLine size="40" color="#ffff"/><br/>FUN! FUN!</button></Link>
            <Link to={btnLink[4]}><button><RiLightbulbFlashLine size="40" color="#ffff"/><br/>customBtn1</button></Link>
            <Link to={btnLink[5]}><button><RiLightbulbFlashLine size="40" color="#ffff"/><br/>customBtn2</button></Link>
        </div>
        <div className="contentBtnContainer">
            <div className="sub1">
                <span style={{color:"white", fontSize: "large"}}>디지털면접</span>
                <Link to="/disitalInterview"><button><img src="./disitalImage.png"></img></button></Link>
                <span style={{color:"white", fontSize: "large"}}>FUN!FUN!</span>
                <Link to="/faceDetector"><button><img src="./faceDetecImage.png"></img></button></Link>
            </div>
            <div className="sub2">
                <span style={{color:"white", fontSize: "large"}}>일자리 센터소개</span>
                <Link to="/centerintro"><button><img src={univFile.center_menu_img}></img></button></Link>
            </div>
        </div>
            {/* <Link to="/"><button className="centerBtn"><CenterNewsSlide /></button></Link>  */}
       {/* <Footer /> */}
       <div style={style}>
           <Link style={{display:"flex", alignItems:"center"}}><span style={{color:"white"}}>이용안내</span><MdHelpOutline size="32" color="#ffff"/></Link>
       </div>
    </div>
}