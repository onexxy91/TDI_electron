import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaBars, FaChevronDown } from 'react-icons/fa';
import { FcSearch } from 'react-icons/fc';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineHome } from 'react-icons/ai';
import CenterModal from './modal/CenterModal';

let custom_api;
export default function CustomAPI2( {history, location} ) {
    const initData = useSelector(state => state.initialReducer);
    const IS_DEV = process.env.REACT_APP_ISDEV;
    const PROXY = process.env.REACT_APP_PROXY;
    const inputRef = useRef();
    const [state, setState] = useState({
        api_data: [],
        isLoading: true,
        cur_page: 1,
        selectedData: undefined,
        isOpen: false
    })
    const api_name = initData.data.config.CUSTOM_API_SEC_NAME;

    if(IS_DEV === "true") {
        custom_api = location.state.api_url;
    }else {
        custom_api = `${PROXY}${location.state.api_url}`;
    }
    const searchNews = async () => {
        const searchText = inputRef.current.value;
        const centerData = await axios.get(`${custom_api}?&page_size=10&cur_page=${state.cur_page}&keyword=${searchText}`);
        setState({
            ...state,
            api_data: centerData.data.result
        })
    }
    const goBack= () => {
        history.goBack();
    }
    const getCenterNotice = async () => {
        const result = await axios.get(`${custom_api}?&page_size=10&cur_page=${state.cur_page}`);
        console.log(result);
        setState({
            ...state,
            isLoading: false,
            api_data: result.data.result
        })
    }
    const showNews = (news) => {
        setState({
            ...state,
            selectedData: news,
            isOpen: true
        })
    }
    const closeNews = () => {
        setState({
            ...state,
            selectedData: undefined,
            isOpen: false
        })
    }
    const pagePlus = async () => {
        const centerNotice = await axios.get(`${custom_api}?&page_size=10&cur_page=${state.cur_page +1}`);
        setState({
            ...state,
            cur_page: state.cur_page +1,
            api_data: state.api_data.concat(centerNotice.data.result)
        })
    }
    useEffect(()=> {
        getCenterNotice();
    }, []);

    return <section>
        {state.isLoading ? (<div style={{backgroundColor:"rgb(243, 230, 213)", height:"100vh"}}>
            <span>loding..</span>
        </div>) : <div className="container" style={{backgroundColor:"rgb(243, 230, 213)"}}>
            <Navbar />
            <div className="menuBar">
                <button onClick={goBack}><FaArrowLeft size="32" color="#ffff" /></button>
                {/* <p>{api_name}</p> */}
                <p>공지사항</p>
                {/* <button><RiScissorsCutFill size="32" color="#ffff" /><br/>스크랩</button> */}
                <Link to="/menuAll"><button className="allSeviceBtn"><FaBars size="32" color="#ffff"/><br/>메뉴보기</button></Link>
            </div>
            <div className="newSearch">
                <input className="searchInput" ref={inputRef} type="text" placeholder="검색어 입력" />
                <button onClick={searchNews} className="centerde"><FcSearch size="34" color="#ffff"/></button>
            </div>
            <div className="info">
                { state.api_data.map((data, index) => (
                    <button key={index} className="list" onClick={() => showNews(data)}>
                      <div className="list-title">
                          <span>{data.title.slice(0,50)}</span>
                          {/* <img src={data.d_image}></img> */}
                      </div>
                      <div className="list-sub">
                          <span className="cName">작성자: {data.writer}</span>
                          <span className="endDate"> 등록일: {data.pubDate}</span>
                      </div>
                  </button>
                ))}
            </div>
            <div className="plus">
                {state.api_data.length > 0 ?
                    <button onClick={pagePlus}><FaChevronDown size="34" color="rgb(54, 51, 47, 0.8)"/></button> 
                    : <button></button>
                }
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            <CenterModal closeNews={closeNews} isOpen={state.isOpen} selectedNews={state.selectedData}/>    
        </div>}
    </section>
}