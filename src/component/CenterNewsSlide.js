import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdNotificationsNone } from 'react-icons/md';
import axios from 'axios';
import { useSelector } from 'react-redux';


const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;
let centerNoticeAPI;

if (IS_DEV === "true") {
    centerNoticeAPI = '/api/notice_list.api';
}else {
    centerNoticeAPI = `${PROXY}/api/notice_list.api`;
}
export default function CenterNewsSlide() {
    const initData = useSelector(state => state.initialReducer);
    const [state, setState] = useState({
        isLoading: true
       
    });
    const ADMIN_ID = initData.data.config.ADMIN_ID;
    const setting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1, 
        slidesToSctoll: 1,
        autoplay: true,
        arrows: false,
        vertical: true
    }
    
const centerBtn = {
    width: "100vh",
    height: "7vh",
    backgroundColor: "rgba(19, 19, 18, 0.363)",
    borderRadius: "30px",
    color: "white",
    outline: "none",
    cursor: "pointer",
    marginTop: "1vh",
    fontSize: "2vh",
    fontFamily: "gmaget",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

}
    const getCenterNews = async () => {
        const centerNotice = await axios.get(`${centerNoticeAPI}?group_id=${ADMIN_ID}&admin_id=${ADMIN_ID}&page=1&path=DID}`);
        //console.log("메인 센터소식 슬라이드", centerNotice.data.result);

        setState({
            ...state, 
            newsData: centerNotice.data.result,
            isLoading: false
        })
        //console.log("뉴스데이터는?", state.newsData);
       // console.log(state.newsData.length);
    }

    useEffect(() => {
        getCenterNews();
    }, [])

    return (<section>
        {state.isLoading ? (<div style={{ height: "6vh" }}></div>) 
        :state.newsData.length === 0 ? (
            <button style={centerBtn} ><MdNotificationsNone size="35" color="#ffff"/> 센터소식 +</button>
            )
        : state.newsData.length === 1 ? (
            <button style={centerBtn} ><MdNotificationsNone size="35" color="#ffff"/> {state.newsData[0].title}</button>
            )
        : (<Slider style={{width:'100vh', height:'6vh' }} {...setting}>
        {state.newsData.map((notice, index) => (
            <div>
                <button style={centerBtn} key={index}><MdNotificationsNone size="35" color="#ffff"/> {notice.title}</button>
            </div>
        ))}
      </Slider>)
        }
    </section>
    )
   
}