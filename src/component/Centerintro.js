import React from 'react'
import Navbar from './Navbar'
import { FaArrowLeft, FaBars } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './centerintro.css'
import { useSelector } from 'react-redux'



export default function Centerintro({ history }) {
const data = useSelector((state) => state.initialReducer);
const introImg = data.data.univFile[0].center_detail_img;
const ADMIN_NAME = data.data.config.ADMIN_NAME;

    const goBack = () => {
        history.goBack()
    }

    return (
        <div className="container" style={{backgroundColor:"rgb(243, 230, 213)"}}>
            <Navbar />
            <div className="menuBar">
                <button onClick={goBack}><FaArrowLeft size="32" color="#ffff" /></button>
                <p>{ADMIN_NAME}</p>
                {/* <button><RiScissorsCutFill size="32" color="#ffff" /><br/>스크랩</button> */}
                <Link to="/menuAll"><button className="allSeviceBtn"><FaBars size="32" color="#ffff"/><br/>메뉴보기</button></Link>
            </div>
            <div className="intro">
                <div className="test">
                    <img src={introImg}></img>
                </div>
            </div>
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
            
        </div>
    )
}