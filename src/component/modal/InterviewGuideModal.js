import React from 'react'
import ReactModal from 'react-modal';
import "./centerModal.css"


export default function InterviewGuideModal(props) {
    const btnSytle = {
        color: "white",
        backgroundColor: "rgb(255, 136, 0)",
        border: "none",
        borderRadius: "5px",
        height: "5.5vh",
        outline: "none",
        cursor: "pointer",
        marginRight: "3px",
        fontFamily: "gmaget",
        width:"50%",
        fontSize:"22px"
    }
    return (
        <ReactModal isOpen={props.isOpen}
        contentLabel="modal Example" 
        ariaHideApp={false}
        style={{ 
            overlay: {
                 backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            content: {
                top: '0px',
                bottom: '0px',
                right:'0px',
                left:'0px',
                backgroundColor: 'rgba(255, 255, 255, 0)'
            }}}> 
            <div className="modalContainer" 
            style={{backgroundImage: 'url(./disitalInterviewPopup.png)',
                     backgroundSize: "cover"}}>
            <div style={{display:"flex", width:"100%", justifyContent:"center", height:"83%", alignItems:"flex-end"}}>
                <button style={btnSytle} onClick={props.closeNews}>확인</button>
            </div>
            </div>
    </ReactModal>
    )
}