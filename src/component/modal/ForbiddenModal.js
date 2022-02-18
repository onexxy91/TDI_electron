import React from 'react'
import ReactModal from 'react-modal'


export default function ForbiddenModal( props ) {
    return (
       <ReactModal
            isOpen={props.isOpen}
            contentLabel="modal Example" 
            ariaHideApp={false}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 40,
                    right: 40,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                },
                content: {
                    top: 400,
                    bottom: 400,
                    backgroundColor: 'rgba(245, 255, 255, 0.95)',
                    borderRadius: "15px"
                }
            }}>
            <div style={{display:"flex", flexFlow:"column wrap", height:"100%", width:"100%", justifyContent:"space-between", alignItems:"center"}}>
                <span style={{fontFamily: "gmaget", fontSize: "2vh",}}>{props.message}</span>
                <button onClick={props.close} style={{fontSize: "2vh", fontWeight: "700", outline: "none", cursor: "pointer",fontFamily: "gmaget", border:"none", width:"10vh", height:"4.2vh", backgroundColor:"#5bc0de", color:"#ffff" }}>CLOSE</button>
            </div>
       </ReactModal>
    )
}