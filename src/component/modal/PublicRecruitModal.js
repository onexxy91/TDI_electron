import axios from 'axios';
import React, { useState } from 'react';
import ReactModal from 'react-modal';




let public_Recruit_API;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if(IS_DEV ===  "true") {
    public_Recruit_API = '/api/pnJobRecruitInfoDetail.api';
}else {
    public_Recruit_API = `${PROXY}/api/pnJobRecruitInfoDetail.api`;
}

export default function PublicRecruitModal( props ) {
    const [state, setState] = useState({
        detailData : []
    })
    const getRecruitDetail = async () => {
        const detail = await axios.get(`${public_Recruit_API}?guid=${props.selectedRecruit.guid}`);
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
                    <span id="text">기업명</span>
                    <span id="value">{props.selectedRecruit.comany}</span>
                </div>
                <div className="row">
                    <span id="text">대표자</span>
                    <span id="value">{state.detailData.ceo}</span>
                </div>
                <div className="row">
                    <span id="text">업종</span>
                    <span id="value">{state.detailData.company_kinds}</span>
                </div>
                <div className="row">
                    <span id="text">근로자수</span>
                    <span id="value">{state.detailData.worker_num}</span>
                </div>
                <div className="row">
                    <span id="text">주소</span>
                    <span id="value">{state.detailData.address}</span>
                </div>
                <div className="row">
                    <span id="text">홈페이지</span>
                    <span id="value">{state.detailData.homepage}</span>
                </div>
                <span className="subTitle">채용정보</span>
                <div className="row">
                    <span id="text">채용직종</span>
                    <span id="value">{state.detailData.job_kinds}</span>
                </div>
                <div className="row">
                    <span id="text">모집인원</span>
                    <span id="value">{state.detailData.call_member}</span>
                </div>
                <div className="row">
                    <span id="text">업무내용</span>
                    <span id="value">{state.detailData.job}</span>
                </div>
                <div className="row">
                    <span id="text">고용형태</span>
                    <span id="value">{state.detailData.work_type}</span>
                </div>
                <div className="row">
                    <span id="text">급여조건</span>
                    <span id="value">{state.detailData.money}</span>
                </div>
                <div className="row">
                    <span id="text">근무시간</span>
                    <span id="value">{state.detailData.work_time}</span>
                </div>
                <div className="row">
                    <span id="text">4대보험가입여부</span>
                    <span id="value">{state.detailData.insure}</span>
                </div>
                <div className="row">
                    <span id="text">근무지역</span>
                    <span id="value">{state.detailData.work_area}</span>
                </div>
                <span className="subTitle">지원절차</span>
                <div className="row">
                    <span id="text">지원마감</span>
                    <span id="value">{state.detailData.receive_term}</span>
                </div>
                <div className="row">
                    <span id="text">접수방법</span>
                    <span id="value">{state.detailData.sheet_method}</span>
                </div>
                <div className="row">
                    <span id="text">전형방법</span>
                    <span id="value">{state.detailData.screening_process}</span>
                </div>
                <div className="row">
                    <span id="text">제출서류</span>
                    <span id="value">{state.detailData.doc_submission}</span>
                </div>
                <div className="row">
                    <span id="text">담당자 정보</span>   
                    <span id="value"><div dangerouslySetInnerHTML={{__html:state.detailData.manager_info}}></div></span>
                    
                </div>
           </div>
           <div className="btnGroup">
                    {/* <button onClick={props.closeRecruit} className="closeBtn">스크랩</button> */}
                    <button onClick={props.closeRecruit} className="closeBtn">닫기</button>
                    {/* <button onClick={props.closeRecruit} className="closeBtn">프린트하기</button> */}
                </div>
           </div>
            }
        </ReactModal>
    )
}