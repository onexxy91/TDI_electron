
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import {BiUser, BiUserCheck} from 'react-icons/bi';
import WorknetModal from './WorknetModal';

const ment = [
    "오늘도 좋은하루 되세요!"
    , "화이팅!!"
    , "항상 응원합니다 !!"
    , "즐거운 나날들의 연속이길!!"
    , "좋은일이 생길것 같은 오늘"
]
const GuideModal = (props) =>{
    const initData = useSelector(state => state.initialReducer);
    const regioncode = initData.data.region;
    const [selectedRecruit, setSelectedRecruit] = useState(undefined);

    const guideModalStyle = {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", 
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        width: "100%",
        userSelect: "none",
        fontFamily: "gmaget"
    }
    const triangleup = {
        width: "0",
        height: "0",
        borderLeft: "50px solid transparent",
        borderRight: "50px solid transparent",
        borderBottom: "100px solid pink",
      }
    const infoStyle = {
        display: "flex",
        flexDirection : "row",
        width: "100%",
        height: "100%",
        flexWrap: "nowrap",
        // backgroundColor: "aqua",
        justifyContent: "space-between",
    }
    const naverInfoStyle = {
        display: "flex",
        flexDirection : "column",
        width: "100%",
        height: "100%",
        flexWrap: "nowrap",
        background: "rgb(139,228,230)",
        background: "linear-gradient(0deg, rgba(139,228,230,1) 0%, rgba(237,186,76,0.8155637254901961) 100%)",
        justifyContent: "space-between",
        alignItems: "center",
        flex:1,
        marginLeft: "5px"
    }
    const circularImgStyle = {
        display: "inline-block",
        position: "relative",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        border: "2px solid green",
        overflow: "hidden",
        
    }
    const spanStyle={
        color:"#ffff",
        marginLeft:"5px",
        fontSize: "18px"
    }
    const btnStyle={
        width:"48%",
        color:"#ffff",
        outline: "none",
        backgroundColor: "rgba(3, 12, 24, 0.382)",
        cursor: "pointer",
        border: "none",
        fontSize: "16px",
        borderRadius: "5px",
        fontFamily: "gmaget"
    }
    const recruitStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "34vh",
        overflow: "auto"
    }
    const listStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginTop: "1px",
        backgroundColor: "rgba(249, 250, 250, 0.782)",
        maxHeight: "7vh",
        minHeight: "7vh",
        width: "99%",
        cursor: "pointer",
        fontFamily: "gmaget"
        
    }
    const showRecruit = (recruit) => {
        console.log("res",recruit);
        setSelectedRecruit(recruit)
    }; 
    const closeRecruit = () => {
        setSelectedRecruit(undefined)
    }
    const mentFunction = () => {
        const random = Math.floor(Math.random() * 5);
        return ment[random]
    }
    return (
        <ReactModal isOpen={props.image}
            contentLabel="modal Example" 
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: "rgba(3, 3, 3, 0)"
                },
                content: {
                    top: '35vh',
                    bottom: '7.7vh',
                    left: "17vh",
                    right:"17vh",
                    backgroundColor: "rgba(3, 3, 3, 0.500)"
                }}}>
                <div className="guideModal" style={guideModalStyle}>
                <div className="faceInfo" style={infoStyle}>
                    <div className="naverInfo" style={naverInfoStyle}>
                        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"7vh", width:"100%"}}>
                            <BiUser size="30" color="#ffff"></BiUser>
                            <span style={spanStyle}>안면인식 정보</span>
                        </div>
                        <div style={{ display:"flex", justifyContent: "flex-start", alignItems: "center", width:"100%", height:"3vh", background: "rgb(109,101,237)",
                            background: "linear-gradient(0deg, rgba(109,101,237,0.277468487394958) 100%, rgba(237,186,76,0.8155637254901961) 100%)", marginBottom:"1px"}}>
                            <span style={spanStyle}>지역: 화성시</span>
                        </div>
                        <div style={{ display:"flex", justifyContent: "flex-start", alignItems: "center", width:"100%",  height:"3vh", background: "rgb(109,101,237)",
                            background: "linear-gradient(0deg, rgba(109,101,237,0.277468487394958) 100%, rgba(237,186,76,0.8155637254901961) 100%)",}}>
                            {props.face.gender && <span style={spanStyle}>성별: {props.face.gender}({props.face.age}세)</span>}
                        </div>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"4vh"}}>
                            <span style={spanStyle}>FACE MATCH CELEBRITY</span>
                        </div>
                        <div style={circularImgStyle}>
                            <img src={props.image} />
                        </div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-around",width:"50%", height:"5vh"}}>
                            {props.celebrity.celebrity && <span style={{ color:"#ffff", fontSize:"22px", fontWeight:"600"}}>{props.celebrity.celebrity}</span>}
                            {props.celebrity.confidence && <span style={{color:"yellow", fontSize:"30px", fontWeight:"600"}}>{props.celebrity.confidence}%</span>}
                        </div>
                        <div style={{display:"flex", justifyContent:"space-around", width:"100%", height:"6vh"}}>
                            <button style={btnStyle} onClick={props.closeNews}>닫기</button>
                            <button style={btnStyle} onClick={props.restart}>다시하기</button>
                        </div>
                        
                    </div>
                    <div  className="naverInfo" style={naverInfoStyle}>
                        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"7vh", width:"100%"}}>
                            <BiUserCheck size="35" color="#ffff"></BiUserCheck>
                            <span style={spanStyle}> 맞춤 추천 채용정보</span>
                        </div>
                        <div style={{ display:"flex", justifyContent: "center", alignItems: "center", width:"100%", height:"3vh", background: "rgb(109,101,237)",
                            background: "linear-gradient(0deg, rgba(109,101,237,0.277468487394958) 100%, rgba(237,186,76,0.8155637254901961) 100%)", marginBottom:"1px"}}>
                            {props.recruitData && <span style={spanStyle}>(화성시, {props.recruitData.kind})</span>}
                        </div>
                        <div style={{ display:"flex", justifyContent: "center", alignItems: "center", width:"100%",  height:"3vh", background: "rgb(109,101,237)",
                            background: "linear-gradient(0deg, rgba(109,101,237,0.277468487394958) 100%, rgba(237,186,76,0.8155637254901961) 100%)",}}>
                            {props.face.gender && <span style={spanStyle}>{mentFunction()}</span>}
                        </div>
                        <div style={recruitStyle}>
                          {props.recruitData && props.recruitData.data.map((list, index) => (
                              <button key={index} style={listStyle} onClick={()=> showRecruit(list)}>
                                <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                                    <span style={{color:"orange", fontSize:"14px", fontWeight:"600"}}>{list.company.slice(0,10)}</span>
                                    <span style={{}}>{list.closeDt.slice(0,8)}..</span>
                                </div>
                                  
                                  <span style={{fontSize:"15px"}}>{list.title}</span>
                              </button>
                          ))}
                        </div>
                    </div>
                </div>
            </div>
            <WorknetModal
                closeRecruit= {closeRecruit}
                selectedRecruit={selectedRecruit}/>
        </ReactModal>
    )
}

export default GuideModal;