import React from 'react'
import ReactModal from 'react-modal';
import "./centerModal.css"


const conterntInnerHtml = (content) => {
    let htmlObj = document.createElement('div');
    htmlObj.innerHTML = content;

    return htmlObj;

}
const CenterModal = (props) =>{
    return (
        <ReactModal isOpen={props.isOpen}
            contentLabel="modal Example" 
            ariaHideApp={false}
            style={{
                content: {
                    top: '3vh',
                    bottom: '3vh',
                    left:'35vh',
                    right:'35vh'
                }}}> 
                {props.selectedNews && <div className="modalContainer">
                <div className="top">
                    <span id="title">{props.selectedNews.title}</span>
                </div>
                <div className="content">
                    {props.selectedNews.d_image && <img src={props.selectedNews.d_image}></img>}
                    {props.selectedNews.w_image && <img src={props.selectedNews.w_image}></img>}
                    {props.selectedNews.n_image && <img src={props.selectedNews.n_image}></img>}
                    {props.selectedNews.u_image && <img src={props.selectedNews.u_image}></img>}
                    <div>
                        <span id="content">{props.selectedNews.contents}</span>
                    </div>
                    {/* {props.selectedNews.content} */}
                    <div dangerouslySetInnerHTML={{__html:props.selectedNews.content }} >
                    </div>
                </div>
                <button className="close" onClick={props.closeNews}>닫기</button>
                </div>}
        </ReactModal>
    )
}
export default CenterModal;