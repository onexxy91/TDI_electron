import React from 'react'
import ReactModal from 'react-modal';
import './recruitModal.css';

const RecruitModal = (props) => {
    return (
        <ReactModal isOpen={props.selectedRecruit} 
            contentLabel="modal Example" 
            ariaHideApp={false}
            style={{
                content: {
                    top: '5vh',
                    bottom: '4vh',
                    left: '30vh',
                    right:'30vh'

                }
            }}>
            {props.selectedRecruit && <div className="modalContainer">
                <div className="top">
                    <p id="title">{props.selectedRecruit.title}</p>
                </div>
                <div className="recruitInfo">
                    <span className="subTitle">모집요강</span>
                    <div className="row">
                        <span id="text">회사명</span>
                        <span id="value">{props.selectedRecruit.cName}</span>
                    </div>
                    <div className="row">
                        <span id="text">모집인원</span>
                        <span id="value"></span>
                    </div>
                    <div className="row">
                        <span id="text">신입/경력구분</span>
                        <span id="value">{props.selectedRecruit.giCareer}</span>
                    </div>
                    <div className="row">
                        <span id="text">경력</span>
                        <span id="value">{props.selectedRecruit.careerYearCnt}</span>
                    </div>
                    <div className="row">
                        <span id="text">학력</span>
                        <span id="value">{props.selectedRecruit.eduCutLine}</span>
                    </div>
                    <span className="subTitle">근무조건</span>
                    <div className="row">
                        <span id="text">근무지역</span>
                        <p id="value">{props.selectedRecruit.jobArea}</p>
                    </div>
                    <div className="row">
                        <span id="text">직책</span>
                        <span id="value">{props.selectedRecruit.jikGub}</span>
                    </div>
                    <div className="row">
                        <span id="text">고용형태</span>
                        <span id="value">{props.selectedRecruit.jobType}</span>
                    </div>
                    <div className="row">
                        <span id="text">급여</span>
                        <span id="value">{props.selectedRecruit.giPay}</span>
                    </div>
                    <span className="subTitle">접수기간/방법</span>
                    <div className="row">
                        <span id="text">마감일</span>
                        <span id="value">{props.selectedRecruit.endDate}</span>
                    </div>
                    <div className="row">
                        <span id="text">접수방법</span>
                        <span id="value">{props.selectedRecruit.jkQr}</span>
                    </div>
                    <span className="subTitle">상세요강</span>
                    <div className="jobiframe">
                        <iframe className="jobDetailView" width="100%" height="1500px" frameborder="no" src={props.selectedRecruit.JobDetailView} />
                    </div>  
                </div>
                <div className="btnGroup">
                    {/* <button onClick={props.closeRecruit} >스크랩</button> */}
                    <button onClick={props.closeRecruit} >닫기</button>
                    {/* <button onClick={props.closeRecruit} >프린트하기</button> */}
                </div>
            </div>}
            
        </ReactModal>
    )
}

export default RecruitModal;