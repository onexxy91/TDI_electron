import React from 'react'
import ReactModal from 'react-modal';
import "./centerModal.css"

const CenterModal = (props) =>{
    return (
        <ReactModal isOpen={props.selectedNews}
            contentLabel="modal Example" 
            ariaHideApp={false}
            style={{
                content: {
                    top: '120px',
                    bottom: '80px',
                }}}> 
                {props.selectedNews && <div className="modalContainer">
                <div className="top">
                    <span id="title">{props.selectedNews.title}</span>
                </div>
                <div className="content">
                    {props.selectedNews.d_image && <img src={props.selectedNews.d_image}></img>}
                    <span id="content">{props.selectedNews.contents}</span>
                </div>
                <button className="close" onClick={props.closeNews}>닫기</button>
                </div>}
        </ReactModal>
    )
}

export default CenterModal;