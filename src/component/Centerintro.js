import React from 'react'
import Navbar from './Navbar'
import { FaArrowLeft, FaBars } from 'react-icons/fa'
import { RiScissorsCutFill } from 'react-icons/ri'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import './centerintro.css'
import { useSelector } from 'react-redux'

const ADMIN_NAME = process.env.REACT_APP_ADMIN_NAME;

export default function Centerintro({ history }) {
const data = useSelector((state) => state.initialReducer);
const introImg = data.data.univFile[0].center_detail_img;

    const goBack = () => {
        history.goBack()
    }

    return (
        <div className="container" style={{backgroundColor:"rgb(243, 230, 213)"}}>
            <Navbar />
            <div className="menuBar">
                <button onClick={goBack}><FaArrowLeft size="32" color="#ffff" /></button>
                <p>{ADMIN_NAME}</p>
                <button><RiScissorsCutFill size="32" color="#ffff" /><br/>스크랩</button>
                <Link to="/menuAll"><button className="allSeviceBtn"><FaBars size="32" color="#ffff"/><br/>전체보기</button></Link>
            </div>
            <div className="intro">
                <div className="test">
                    <img src={introImg}></img>
                </div>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            {/* <Footer/> */}
        </div>
    )
}