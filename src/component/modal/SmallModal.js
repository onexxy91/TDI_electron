import React from 'react'
import ReactModal from 'react-modal'
import './recruitModal.css';

const SmallModal = (props) => {
    
    return (
        <ReactModal isOpen={props.selectedRecruit} 
            contentLabel="modal Example" 
            ariaHideApp={false}
            style={{
                content: {
                    top: '120px',
                    bottom: '80px'
                }
            }}>
        {props.selectedRecruit && <div className="modalContainer">
                <div className="top">
                    <p id="title">{props.selectedRecruit.coNm}</p>
                </div>
                <div className="recruitInfo">
                    <span className="subTitle">기업정보</span>
                    <div className="row">
                        <span id="text">회사명</span>
                        <span id="value">{props.selectedRecruit.coNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">대표자</span>
                        <span id="value">{props.selectedRecruit.reperNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">브랜드명</span>
                        <span id="value">{props.selectedRecruit.sgBrandNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">사원수</span>
                        <span id="value">{props.selectedRecruit.alwaysWorkerCnt}명</span>
                    </div>
                    <div className="row">
                        <span id="text">업종</span>
                        <span id="value">{props.selectedRecruit.indTpNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">전화번호</span>
                        <p id="value">{props.selectedRecruit.coTelNo}</p>
                    </div>
                    <div className="row">
                        <span id="text">홈페이지</span>
                        <span id="value">{props.selectedRecruit.coHomePage}</span>
                    </div>
                    <div className="row">
                        <span id="text">회사주소</span>
                        <span id="value">{props.selectedRecruit.coAddr}</span>
                    </div>
                    <span className="subTitle">사업내용</span>
                    <div className="row">
                        <span id="text">주요생산품목</span>
                        <span id="value">{props.selectedRecruit.coMainProd}</span>
                    </div>
                    <div className="row">
                        <span id="text">사업내용</span>
                        <span id="value">{props.selectedRecruit.coContent}</span>
                    </div>
                </div>
                <div className="btnGroup">
                    <button onClick={props.closeRecruit} className="closeBtn">스크랩</button>
                    <button onClick={props.closeRecruit} className="closeBtn">닫기</button>
                    <button onClick={props.closeRecruit} className="closeBtn">프린트하기</button>
                </div>
            </div>}
            
        </ReactModal>
    )
}
export default SmallModal;