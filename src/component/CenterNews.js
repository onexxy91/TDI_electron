import React, { useEffect, useRef, useState } from 'react'
import { FcSearch } from 'react-icons/fc'
import { FaArrowLeft, FaBars, FaChevronDown } from 'react-icons/fa'
import { RiScissorsCutFill } from 'react-icons/ri'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import "./centerNews.css"
import axios from 'axios'
import Footer from './Footer'
import CenterModal from './modal/CenterModal'
import { useSelector } from 'react-redux'

let center_news_api;

const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

if(IS_DEV === "true") {
    center_news_api = "/api/notice_list.api";
}else {
    center_news_api = `${PROXY}/api/notice_list.api`;
}
export default function CenterNews({ history })  {
    const initData = useSelector(state => state.initialReducer);
    const [state, setState] = useState({
        newsData: [],
        isLoading: true,
        cur_page: 1,
        selectedNews: undefined
    })
    console.log(initData);
    
    const admin_id = initData.data.config.ADMIN_ID;
    const inputRef = useRef();

    const goBack = () => {
        history.goBack()
    }
    const closeNews = () => {
        setState({
            ...state,
            selectedNews: undefined
        })
    }
    const showNews = (news) => {
        setState({
            ...state,
            selectedNews: news
        })
    }
    const searchNews = async () => {
        const searchText = inputRef.current.value;
        const centerNotice = await axios.get(`${center_news_api}?group_id=${admin_id}&admin_id=${admin_id}&page=${state.cur_page}&path=DID&kwrd=${searchText}`);
        setState({
            ...state,
            newsData: centerNotice.data.result
        })
    }
    const pagePlus = async () => {
        const centerNotice = await axios.get(`${center_news_api}?group_id=${admin_id}&admin_id=${admin_id}&page=${state.cur_page +1}&path=DID`);
        setState({
            ...state,
            cur_page: state.cur_page +1,
            newsData: state.newsData.concat(centerNotice.data.result)
        })
    }
    //param client별 변경 해야함  ok
    const getCenterNotice = async () => {
        const centerNotice = await axios.get(`${center_news_api}?group_id=${admin_id}&admin_id=${admin_id}&page=${state.cur_page}&path=DID`);
        setState({
            ...state,
            isLoading: false,
            newsData: centerNotice.data.result
        })
    }
    useEffect(()=> {
        getCenterNotice();
    }, [])
   
    return ( <section>
        {state.isLoading ? (<div style={{backgroundColor:"rgb(243, 230, 213)"}}>
            <span>loading..</span>
            </div>) : ( <div className="container" style={{backgroundColor:"rgb(243, 230, 213)"}}>
            <Navbar />
            <div className="menuBar">
                <button onClick={goBack}><FaArrowLeft size="32" color="#ffff" /></button>
                <p>센터소식</p>
                {/* <button><RiScissorsCutFill size="32" color="#ffff" /><br/>스크랩</button> */}
                <Link to="/menuAll"><button className="allSeviceBtn"><FaBars size="32" color="#ffff"/><br/>메뉴보기</button></Link>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            <div className="newSearch">
                <input className="searchInput" ref={inputRef} type="text" placeholder="검색어 입력" />
                <button onClick={searchNews} className="centerde"><FcSearch size="34" color="#ffff"/></button>
            </div>
            <div className="info">
                { state.newsData.map((news, index) => (
                    <button key={index} className="list" onClick={() => showNews(news)}>
                      <div className="list-title">
                          <span>{news.title.slice(0,50)}</span>
                          <img src={news.d_image}></img>
                      </div>
                      <div className="list-sub">
                          <span className="cName"></span>
                          <span className="endDate"> 등록일: {news.date}</span>
                      </div>
                  </button>
                ))}
            </div>
            <div className="plus">
            {state.newsData === 10 ?
                <button onClick={pagePlus}><FaChevronDown size="34" color="rgb(54, 51, 47, 0.8)"/></button> 
                : <button></button>
            }
            </div>
            {/* <Footer /> */}
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            <CenterModal closeNews={closeNews} selectedNews={state.selectedNews}/>
        </div>)
        }
        </section>)
}