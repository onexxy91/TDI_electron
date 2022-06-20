import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import './jobAll.css'
import { FaArrowLeft, FaBars, FaChevronDown } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import {RiScissorsCutFill} from 'react-icons/ri';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import { FcSearch } from 'react-icons/fc';
import { AiOutlineHome } from 'react-icons/ai';
import RecruitModal from './modal/RecruitModal';
import WorknetModal from './modal/WorknetModal';
import SmallModal from './modal/SmallModal';
import PublicRecruitModal from './modal/PublicRecruitModal';
// import Keybord from 'react-hangul-virtual-keyboard';

let JOBKOREA_PATH;
let WORKNET_PATH;
let WORKNET_SMALL_PATH;
let OPEN_JOB_API;
let PNJOB_PATH;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if(IS_DEV === "true") {
    JOBKOREA_PATH = "/api/jobKoreaRecruitList.api?";
    WORKNET_PATH = "/api/getWorknetRecruit.api?recruitFlag=list";
    WORKNET_SMALL_PATH = "/api/getWorknetSmallGiantRecruit.api?";
    OPEN_JOB_API = "/api/jobKoreaStarterList.api";
    PNJOB_PATH = "/api/pnJobRecruitInfo.api";
}else {
    JOBKOREA_PATH = `${PROXY}/api/jobKoreaRecruitList.api?`;
    WORKNET_PATH = `${PROXY}/api/getWorknetRecruit.api?recruitFlag=list`;
    WORKNET_SMALL_PATH = `${PROXY}/api/getWorknetSmallGiantRecruit.api?`;
    OPEN_JOB_API = `${PROXY}/api/jobKoreaStarterList.api`;
    PNJOB_PATH = `${PROXY}/api/pnJobRecruitInfo.api`;
}

const publicJobGubun = [
    {title: "채용제목", value:"subject"},
    {title: "회사명", value:"company"}
]

let time = 0;
let timeoutIntval = null;
export default function JobAll({ history }) {
    const jobTypePath = history.location.pathname;
    const regionRef = useRef();
    const codeRef = useRef();
    const inputRef = useRef();
    const initData = useSelector(state => state.initialReducer);
    const WORKNET_CODE = initData.data.config.WORKNET_CODE;
    const JOBKOREA_CODE = initData.data.config.JOBKOREA_CODE;
    const jobKoCode = initData.data.jobCode;
    const regioncode = initData.data.region;
    const worknetRegion = initData.data.worknetRegion;
    const worknetCode = initData.data.worknetCode;

    console.log(WORKNET_CODE);
   
    const [state, setState] = useState({
        recruitData:[],
        loading: true,
        cur_page: 0,
        selectedRecruit: undefined
    });

    const showRecruit = (recruit) => {
        console.log("res",recruit);
        setState({
            ...state,
            selectedRecruit: recruit
        })
    }; 
    const closeRecruit = () => {
        setState({
            ...state,
            selectedRecruit: undefined
        })
    }
    //채용직별 페이지 더보기로 수정해야함 0531/-> getjobkoreaRecruit()0602
    // const pageUp = async () => {
    //     const recruitData = await axios.get(`${JOBKOREA_PATH}cur_page=${state.cur_page +1}&page_size=10&area_code=B390`);
    //     setState({
    //         ...state,
    //         cur_page: state.cur_page +1,
    //         recruitData : state.recruitData.concat(recruitData.data.result)
    //     })
    // };
    //param client별 변경 해야함 / Ok
    const getjobkoreaRecruit = async () => {
        let jobSiteType = "";
        let recruitData = "";
        let pref_code = "";
        let http_url = "";

        switch (jobTypePath) {
            case '/jobAll' : 
                recruitData = await axios.get(`${JOBKOREA_PATH}cur_page=${state.cur_page + 1}&page_size=10&area_code=${JOBKOREA_CODE}`);
                jobSiteType = "jobkorea";
                http_url = `${JOBKOREA_PATH}cur_page=${state.cur_page}&page_size=10&area_code=${JOBKOREA_CODE}`;
                break;
            case '/realJobInfo' :
                recruitData = await axios.get(`${JOBKOREA_PATH}cur_page=${state.cur_page + 1}&page_size=10&area_code=${JOBKOREA_CODE}&jtype=6,7,2`);
                jobSiteType = "jobkorea";
                pref_code = "6,7,2";
                break;       
            case '/hsJobInfo' :
                recruitData = await axios.get(`${JOBKOREA_PATH}cur_page=${state.cur_page + 1}&page_size=10&area_code=${JOBKOREA_CODE}&edu_code=3`);
                jobSiteType = 'jobkorea';
                pref_code = "3";
                break;
            case '/youthJobInfo' :
                recruitData = await axios.get(`${WORKNET_PATH}&cur_page=${state.cur_page + 1}&page_size=10&pref_code=13&area_code=${WORKNET_CODE}`);
                console.log(recruitData);
                jobSiteType = "worknet";
                pref_code = "13";
                break;
            case '/middleJobInfo' :
                recruitData = await axios.get(`${WORKNET_PATH}&cur_page=${state.cur_page + 1}&page_size=10&pref_code=B&area_code=${WORKNET_CODE}`);
                jobSiteType = "worknet";
                pref_code = "B"
                break;
            case '/womenJobInfo' :
                recruitData = await axios.get(`${WORKNET_PATH}&cur_page=${state.cur_page + 1}&page_size=10&pref_code=12&area_code=${WORKNET_CODE}`);
                jobSiteType = "worknet";
                pref_code = "12"
                break;
            case '/disJobInfo' :
                recruitData = await axios.get(`${WORKNET_PATH}&cur_page=${state.cur_page + 1}&page_size=10&pref_code=Y|S|D&area_code=${WORKNET_CODE}`);
                jobSiteType = "worknet";
                pref_code ="Y|S|D"
                break;
            case '/smallJobInfo' : 
                recruitData = await axios.get(`${WORKNET_SMALL_PATH}cur_page=${state.cur_page + 1}&page_size=20&area_code=${WORKNET_CODE}`);
                jobSiteType = "worknetsmall";
                break;
            case '/openJobInfo' : 
                recruitData = await axios.get(`${OPEN_JOB_API}?ctgr_code=12&page=${state.cur_page + 1}&path=DID`);
                jobSiteType = "jobkoreaOpen";
                break;
            case '/pnJobInfo' :
                recruitData = await axios.get(`${PNJOB_PATH}?pageno=${state.cur_page + 1}&display=10`);
                jobSiteType = "public";
        }
        console.log("recruit", recruitData);
        setState({
            ...state,
            loading: false,
            recruitData : state.recruitData.concat(recruitData.data.result),
            jobSiteType: jobSiteType,
            cur_page : state.cur_page +1,
            pref_code: pref_code
        })        
    };

       // 페이지 전환 인터벌 
    const timeoutFunc = () => {
        time = time +1
        //console.log("timeout", time);
        if (time === 50) {
            clearInterval(timeoutIntval);
            history.push("/");
            time = 0;
        }
    }
    const setTimezero = () => {
        //console.log("타임제로");
        time = 1;
    }

    useEffect(() => {
        getjobkoreaRecruit(); 
    },[])
    
   // 페이지 전환 인터벌
    useEffect (() => {
        timeoutIntval = setInterval(timeoutFunc, 6000);
        //console.log("인터벌 시작 ");
        window.addEventListener("click", setTimezero);
        return () => {
           // console.log("??");
            window.removeEventListener("click", setTimezero);
            clearInterval(timeoutIntval);
       }
    }, [])

    const goBack = () => {
        history.goBack()
    }
    const getTitleType = () => {
        switch (jobTypePath) {
            case "/jobAll" : 
                return (<p>전체기업</p>) 
            case "/realJobInfo" :
                return (<p>시간제 일자리</p>)
            case "/hsJobInfo" :
                return (<p>고졸 채용</p>)
            case "/youthJobInfo" :
                return (<p>청년 우대기업</p>)
            case "/middleJobInfo" :
                return (<p>중장년 우대기업</p>)
            case "/womenJobInfo" :
                return (<p>여성 우대기업</p>)
            case "/disJobInfo" :
                return (<p>장애인 우대기업</p>)
            case "/smallJobInfo" :
                return (<p>강소기업</p>)
            case "/openJobInfo" :
                return (<p>공채속보</p>)
            case "/pnJobInfo" :
                return (<p>공사공단</p>)    
            default : (<p></p>)
        }
    }
    const getCNameType = (recruit) => {
        if (state.jobSiteType === "jobkorea" || state.jobSiteType === "jobkoreaOpen") {
            return (<span className="cName">{recruit.cName}</span>)
        }else if(state.jobSiteType === "worknet") {
            return (<span className="cName">{recruit.company}</span>)
        }else if(state.jobSiteType === "public") {
            return (<span className ="cName">{recruit.comany} </span>)
        }else {
            return (<span className="cName">{recruit.indTpNm}</span>)
        }
    }
    const getEndDateType = (recruit) => {
        if (state.jobSiteType === "jobkorea" || state.jobSiteType === "jobkoreaOpen") {
            return (<span className="endDate"> 마감일: {recruit.endDate}</span>)
        } else if (state.jobSiteType === "worknet") {
            return (<span className="endDate"> 마감일: {recruit.closeDt}</span>)
        } else if (state.jobSiteType === "public") {
            return (<span className="endDate"> 마감일: {recruit.endDate}</span>)
        } else {
            return null;
        }
    }
    const getRecruitTitleType = (recruit) => {
        if (state.jobSiteType === "worknetsmall") {
            return (<span>{recruit.coNm.slice(0,50)}</span>)
        } else {
            return (<span>{recruit.title.slice(0,50)}</span>)
        }
    }
    
    //강소기업, 전국공채속보 추가해야함 
    const onSearch = async (type) => {
        let regione = "";
        let code = "";
        let input = "";
        if (type === "public"|| type === "worknetsmall") {
            regione = regionRef.current.value;
            input = inputRef.current.value;
        } else if(type === "jobkoreaOpen") {

        } else {
            regione = regionRef.current.value;
            code = codeRef.current.value;
            input = inputRef.current.value;
        }

        let recruitData = "";
        // console.log("code", code);
        if (state.jobSiteType === "jobkorea") {
            if (jobTypePath !== "/hsJobInfo") {
                recruitData = await axios.get(`${JOBKOREA_PATH}cur_page=${state.cur_page}&page_size=10&area_code=${regione}&job_code=${code}&keyword=${input}&jtype=${state.pref_code}`);
            }else {
                recruitData = await axios.get(`${JOBKOREA_PATH}cur_page=${state.cur_page}&page_size=10&area_code=${regione}&job_code=${code}&keyword=${input}&edu_code=${state.pref_code}`);
            }
            //console.log(recruitData);
        } else if (state.jobSiteType === "worknet") {
            recruitData = await axios.get(`${WORKNET_PATH}&cur_page=${state.cur_page}&page_size=10&pref_code=${state.pref_code}&area_code=${regione}&job_code=${code}&keyword=${input}`);
        } else if (state.jobSiteType === "worknetsmall") {
            recruitData = await axios.get(`${WORKNET_SMALL_PATH}cur_page=${state.cur_page}&page_size=20&area_code=${regione}&keyword=${input}`);
        } else if(state.jobSiteType === "public") {
            recruitData = await axios.get(`${PNJOB_PATH}?pageno=${state.cur_page}&display=10&search_text=${input}&gubun_type=${regione}`)
        } else {
            recruitData = await axios.get(`${OPEN_JOB_API}?ctgr_code=12&page=1&path=DID`);
        }
        
        if (recruitData.data.result_code == 500) {
            setState({
                ...state,
                recruitData: []
            })
        }else {
            setState({
                ...state,
                recruitData: recruitData.data.result
            })
        }
        //inputRef.current.value = "";
    }
    return (<section>
        {state.loading ? (<div style={{backgroundColor:"rgb(243, 230, 213)"}}>
            <span></span>
    </div>) : ( 
    <div className="container" style={{backgroundColor:"rgb(243, 230, 213)"}}>
            <Navbar />
            <div className="menuBar">
            <button onClick={goBack}><FaArrowLeft size="32" color="#ffff" /></button>
                 {getTitleType()}
                {/* <button><RiScissorsCutFill size="32" color="#ffff" /><br/>스크랩</button> */}
                <Link to="/menuAll"><button className="allSeviceBtn"><FaBars size="32" color="#ffff"/><br/>메뉴보기</button></Link>
            </div>
            <div className="search">
                    {state.jobSiteType === "jobkorea" ?
                     <select ref={regionRef}>
                    {regioncode.map((code, index) => {
                        if (code.code === JOBKOREA_CODE) { //config 값으로 대체 해야함
                            return (
                                <option key={index} value={code.code} selected>{code.value}</option>
                            )
                        }else {
                            return (
                                <option key={index} value={code.code}>{code.value}</option>
                            )
                        }
                    })} </select> : 
                    state.jobSiteType === "worknet" ?
                    <select ref={regionRef}>
                         {worknetRegion.map((code, index) => {
                            if (code.code === WORKNET_CODE) { //config 값으로 대체 해야함
                                return (
                                    <option key={index} value={code.code} selected>{code.value}</option>
                                )
                            }else {
                                return (
                                    <option key={index} value={code.code}>{code.value}</option>
                                )
                            }
                        })}</select> : 
                        state.jobSiteType === "public" ?
                        <select ref={regionRef}>
                        {publicJobGubun.map((code, index) => {
                            return (
                                <option key={index} value={code.value}>{code.title}</option>
                            )
                        })}</select> 
                        : state.jobSiteType === "worknetsmall" ?
                        <select ref={regionRef}>
                            {worknetRegion.map((code, index) => {
                            if (code.code === WORKNET_CODE) { //config 값으로 대체 해야함
                                return (
                                    <option key={index} value={code.code} selected>{code.value}</option>
                                )
                            }else {
                                return (
                                    <option key={index} value={code.code}>{code.value}</option>
                                )
                            }
                        })}</select>:<div></div>
                    }
                
                    {state.jobSiteType === "jobkorea" ?
                     <select ref={codeRef}>
                        <option value="">직종</option>
                        {jobKoCode.map((code, index) => (
                           <option key={index} value={code.code}>{code.value}</option>
                        ))} 
                    </select> : state.jobSiteType === "worknet" ?
                            <select ref={codeRef}>
                            <option value="">직종</option>
                            {worknetCode.map((code, index) => (
                            <option key={index} value={code.code}>{code.value}</option>
                        ))} 
                    </select> : <div></div>
                    }
                
                <input className="searchInput" ref={inputRef} type="text" placeholder="검색어 입력" />
                <button onClick={() => onSearch(state.jobSiteType)} className="centerde"><FcSearch size="28" color="#ffff"/></button>
            </div>
            <div className="info"> 
            {state.recruitData < 1 ? (<div className="notInfo">
                <BsSearch size="70" color="#ffff"/>
                <span>등록된 데이터가 없습니다.</span>
                </div>) :
                 state.recruitData.map((recruit, index) => (
                    <button key={index} className="list" onClick={() => showRecruit(recruit)}>
                      <div className="list-title">
                          {getRecruitTitleType(recruit)}
                      </div>
                      <div className="list-sub">
                          {getCNameType(recruit)}
                          {getEndDateType(recruit)}
                      </div>
                  </button>
                ))  
            }
            </div>
            {state.recruitData < 1 ? (<div className="plus"></div>) :
            (<div className="plus">
                <button onClick={getjobkoreaRecruit}><FaChevronDown size="34" color="rgb(54, 51, 47, 0.8)"/></button>
            </div>) 
            }
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            {state.jobSiteType === "worknet" ? 
            (<WorknetModal 
                closeRecruit= {closeRecruit}
                selectedRecruit={state.selectedRecruit}/>) 
                : state.jobSiteType === "jobkorea" || state.jobSiteType === "jobkoreaOpen" ?
                (<RecruitModal closeRecruit ={closeRecruit}
                    selectedRecruit={state.selectedRecruit} />)
                : state.jobSiteType === "public" ?
                (<PublicRecruitModal closeRecruit={closeRecruit}
                        selectedRecruit={state.selectedRecruit} />)
                :(<SmallModal closeRecruit={closeRecruit}
                    selectedRecruit={state.selectedRecruit} />)
            }
        </div>)
        }
        </section>
    );
}
