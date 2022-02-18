import React from 'react'
import "./MenuAll.css"
import {FaRegIdCard} from 'react-icons/fa'
import {FaRegSmileWink} from 'react-icons/fa'
import {FaUserClock} from 'react-icons/fa'
import {FaBullhorn} from 'react-icons/fa'
import {BiCameraMovie} from 'react-icons/bi'
import {FaQuestionCircle} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'


export default function MenuAll({ history }) {
    const goBack = () => {
        history.goBack();
    }
    return (
        <div className="aontainer">
            <div className="topContainer">
                <h1>서비스 전체보기</h1>
                <button onClick={goBack}>닫기 X</button>
            </div>
            <div className="firContainer">
                <div className="firItem1">
                    <h2><FaRegIdCard size="40" color="#ffff"/>채용정보</h2>
                    <ul>
                        <Link to="/jobAll"><li><button>전체</button></li></Link>
                        <Link to="/youthJobInfo"><li><button>청년</button></li></Link>
                        <Link to="/middleJobInfo"><li><button>중장년</button></li></Link>
                        <Link to="/womenJobInfo"><li><button>여성</button></li></Link>
                        <Link to="/disJobInfo"> <li><button>장애인</button></li></Link>
                        <Link to="/smallJobInfo"><li><button>강소기업</button></li></Link>
                        <Link to="/openJobInfo"><li><button>전국공채속보</button></li></Link>
                    </ul>
                </div>
                <div className="firItem2">
                    <h2><FaRegSmileWink size="40" color="#ffff" />FUN!FUN!</h2>
                    <ul>
                        <Link to="/faceDetector"><li><button>안면인식 맞춤정보</button></li></Link>
                        <li><button>나만의 사원증 만들기</button></li>
                        <li><button>크로마키 촬영</button></li>
                        <Link to="/everyQuiz"><li><button>오늘의 퀴즈</button></li></Link>
                        <Link to="/jobTest"><li><button>직업테스트</button></li></Link>
                        <Link to="/todayEng"><li><button>오늘의 영어 한마디</button></li></Link>
                    </ul>
                </div>
            </div>
            <div className="secContainer">
                <Link className="menuLink" to="/realJobInfo"><button className="realtime"><FaUserClock size="32" color="#ffff"/>  시간제일자리</button></Link>
                <Link className="menuLink" to="/centerNews"><button className="notice"><FaBullhorn size="32" color="#ffff"/>  공지사항</button></Link>
            </div>
            <div className="thrContainer">
                <div className="disitalIn">
                    <h2><BiCameraMovie size="40" color="white"/>디지털인터뷰</h2>
                    <ul>
                        <Link to="/disitalInterview"><li><button>인터뷰진행</button></li></Link>
                        <Link to="/signup"><li><button>회원가입</button></li></Link>
                    </ul>
                </div>
            </div>
            <div className="fourContainer">
            <Link className="menuLink" to="/centerintro"> <button className="quest"><FaQuestionCircle size="35" color="#ffff"/>  이용안내</button></Link>
                <Link className="menuLink" to="/centerintro"><button className="centerde"><FaSearch size="35" color="#ffff"/>  센터상세</button></Link>
            </div>
        </div>
    )
}