import axios from 'axios';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import './recruitModal.css';

let worknet_Recruit_API;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if(IS_DEV ===  "true") {
    worknet_Recruit_API = '/api/getWorknetRecruit.api';
}else {
    worknet_Recruit_API = `${PROXY}/api/getWorknetRecruit.api`;
}
const WorknetModal = (props) => {
//    console.log("worknet", props.selectedRecruit);
    const [state, setState] = useState({
        isLoading: false   
    })

    const getRecruitDetail = async () => {
            const detail = await axios.get(`${worknet_Recruit_API}?recruitFlag=detail&wantedAuthNo=${props.selectedRecruit.wantedAuthNo}`);
            console.log("detail",detail);
    
            setState({
                ...state,
                isLoading: true,
                detailData : detail.data.result[0]
            })
    }

    return (
        <ReactModal isOpen={props.selectedRecruit} 
            contentLabel="modal Example" 
            ariaHideApp={false}
            onAfterOpen={getRecruitDetail}
            style={{
                content: {
                    top: '5vh',
                    bottom: '4vh',
                    left:'30vh',
                    right:'30vh'
                }
            }}>
            {props.selectedRecruit&&state.detailData && <div className="modalContainer">
                <div className="top">
                    <p id="title">{props.selectedRecruit.title}</p>
                </div>
                <div className="recruitInfo">
                    <span className="subTitle">기업정보</span>
                    <div className="row">
                        <span id="text">회사명</span>
                        <span id="value">{props.selectedRecruit.company}</span>
                    </div>
                    <div className="row">
                        <span id="text">대표자</span>
                        <span id="value">{state.detailData.reperNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">기업형태</span>
                        <span id="value">{state.detailData.busiSize}</span>
                    </div>
                    <div className="row">
                        <span id="text">사원수</span>
                        <span id="value">{state.detailData.totPsncnt}</span>
                    </div>
                    <div className="row">
                        <span id="text">사업내용</span>
                        <span id="value">{state.detailData.indTpCdNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">전화번호</span>
                        <span id="value">{state.detailData.contactTelno}</span>
                    </div>
                    <div className="row">
                        <span id="text">회사주소</span>
                        <span id="value">{state.detailData.corpAddr}</span>
                    </div> {/* 기업정보 */}
                    <span className="subTitle">모집요강</span>
                    <div className="row">
                        <span id="text">구인인증번호</span>
                        <span id="value"></span>
                    </div>
                    <div className="row">
                        <span id="text">모집직종</span>
                        <span id="value">{state.detailData.jobsCd}</span>
                    </div>
                    <div className="row">
                        <span id="text">직무내용</span>
                        <span id="value">{state.detailData.jobCont}</span>
                    </div>
                    <div className="row">
                        <span id="text">고용형태</span>
                        <span id="value">{state.detailData.empTpNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">모집인원</span>
                        <span id="value">{state.detailData.collectPsncnt}</span>
                    </div>
                    <div className="row">
                        <span id="text">임금조건</span>
                        <span id="value">{state.detailData.salTpNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">경력조건</span>
                        <span id="value">{state.detailData.enterTpNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">학력</span>
                        <span id="value">{state.detailData.eduNm}</span>
                    </div>
                    <div className="row">
                        <span id="text">근무예정지역</span>
                        <span id="value">{state.detailData.workRegion}</span>
                    </div>
                    <div className="row">
                        <span id="text">근무형태</span>
                        <span id="value">{state.detailData.workdayWorkhrCont}</span>
                    </div>
                    <span className="subTitle">우대사항</span>
                    <div className="row">
                        <span id="text">자격면허</span>
                        <span id="value">{state.detailData.certificate}</span>
                    </div>
                    <div className="row">
                        <span id="text">우대조건</span>
                        <span id="value">{state.detailData.pfCond}</span>
                    </div>
                    <div className="row">
                        <span id="text">장애인채용희망</span>
                        <span id="value"></span>
                    </div>
                    <span className="subTitle">접수기간/방법</span>
                    <div className="row">
                        <span id="text">제출서류</span>
                        <span id="value">{state.detailData.submitDoc}</span>
                    </div>
                    <div className="row">
                        <span id="text">접수방법</span>
                        <span id="value">{state.detailData.rcptMthd}</span>
                    </div>
                    <div className="row">
                        <span id="text">접수기간</span>
                        <span id="value">{state.detailData.receiptCloseDt}</span>
                    </div>
                </div>
                <div className="btnGroup">
                    {/* <button onClick={props.closeRecruit} className="closeBtn">스크랩</button> */}
                    <button onClick={props.closeRecruit} className="closeBtn">닫기</button>
                    {/* <button onClick={props.closeRecruit} className="closeBtn">프린트하기</button> */}
                </div>
            </div>}
            
        </ReactModal>)
}

export default WorknetModal;