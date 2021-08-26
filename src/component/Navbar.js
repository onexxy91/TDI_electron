import React from 'react'
import { FaRegGrinBeam, FaRegFrown, FaGrinSquint, Gear, FaRegMeh, FaRegSadCry } from 'react-icons/fa'
import {GoGear} from 'react-icons/go'
import { WiDaySunny, WiRain, WiCloud, WiCloudy, WiUmbrella } from 'react-icons/wi'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const week = new Array('일', '월', '화', '수', '목', '금', '토');

const getDateTime = ()=> {
    const date = new Date();
    const today = `${date.getMonth()+1}월${date.getDate()}일(${week[date.getDay()]})`;
    
    return today;
}

export default function Navbar({ history }) {
   
    const initData = useSelector(state => state.initialReducer);
    console.log("Nav", initData);
    const weather = initData.data.weather;
    const univFile = initData.data;    
   

    const dustIcons = () => {
        if (weather.dustStr === "좋음") {
            return (<FaRegGrinBeam size="34" color="#ffff"></FaRegGrinBeam>)
        } else if (weather.dustStr === "보통"){
            return (<FaRegMeh size="34" color="#ffff"></FaRegMeh>)
        } else if (weather.dustStr === "나쁨") {
            return (<FaRegFrown size="34" color="#ffff"></FaRegFrown>)
        }else {
            return (<FaRegSadCry size="34" color="#ffff"></FaRegSadCry>)
        }
    }

    const weatherIcons = () => { //더 추가 예정
        //console.log(weather.weatherStr);

        if (weather.weatherStr === "비") {
            return (<WiUmbrella size="42" color="#ffff"></WiUmbrella>)
        } else if (weather.weatherStr === "맑음"){
            return (<WiDaySunny size="42" color="#ffff"></WiDaySunny>)
        } else if (weather.weatherStr === "흐림") {
            return (<WiCloud size="42" color="#ffff"></WiCloud>)
        } else if (weather.weatherStr === "구름많음") {
            return (<WiCloudy size="42" color="#ffff"></WiCloudy>)
        }
    }



    return (
        <div className="logoContainer">
        <Link to="/"> <button className="logoBtn"><img src={univFile.univFile[0].main_logo_file} alt="logo"></img></button></Link>
            <div className="weatherContainer">
                <div className="left">
                    <p id="today">{getDateTime()}</p>
                    <p id="temp">{ weather.cur_temp}ºC</p>
                </div>
                {weatherIcons()}
                <div className="right">
                    <p id="today">미세먼지</p>
                    <p id="temp">{weather.dustStr}</p>
                </div>
                {dustIcons()}
            </div>
            <Link to="/setting"> <button className="settingBtn"><GoGear size="32" color="#ffff"/><br/>설정</button></Link>
        </div>
    )
}