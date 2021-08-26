import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaBars } from 'react-icons/fa'
import { Link} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';
import axios from 'axios';
import Keyboard from 'react-hangul-virtual-keyboard';
import "react-hangul-virtual-keyboard/build/css/index.css";

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;
let LOGIN_API_URL;

if(IS_DEV === "true") {
    LOGIN_API_URL = '/api/univUserLogin.api';
}else {
    LOGIN_API_URL = `${PROXY}/api/univUserLogin.api`;
}

export default function InterviewLogin({ history }) {
    const phoneRef = useRef(HTMLInputElement);
    const passRef = useRef(HTMLInputElement);
    const keyboard = useRef();
    const [layout, setLayout] = useState("default");
    const [language, setLanguage] = useState("default");
    const [inputs, setInputs] = useState({});
    const [inputName, setInputName] = useState("default");
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const divStyle = {
        display: "flex",
        width: "100%",
        height: "70vh",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "gmaget"
        // backgroundColor: "aqua",
        // backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
        
    }
    const inputStyle = {
        backgroundColor: "rgba(240, 240, 245)",
        width: "70%",
        height: "5vh",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        border:"none",
        fontSize:"25px",
        fontFamily: "FontAwesome, gmaget"
        
    }
    const goBack = () => {
        history.goBack()
    }
    const loginStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "70%",
        height: "36vh",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius:"5px",
        marginTop:"4vh"
    }
    const btnStyle ={
        width:"18vh",
        height: "4.5vh",
        backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)",
        border:"none",
        color:"white",
        outline: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize:"18px",
        fontWeight:"600",
        fontFamily: "gmaget"
    }
    useEffect(() => {
        phoneRef.current.focus();
        setKeyboardOpen(true);
    }, [])

    //로그인 
    const loginBtnClick = async () => {
        const id = phoneRef.current;
        const pass = passRef.current;

        if(!id.value) {
            id.focus();
            return;
        }else if(!pass.value) {
            pass.focus();
            return;
        }
        
        const result = await axios.get(LOGIN_API_URL + `?group_id=${ADMIN_ID}&user_id=${id.value}&user_password=${pass.value}&encFlag=N`);
        console.log(result);
        if(result.data.result_code === "200" && result.data.result_msg === "success") {
            console.log("성공")
            history.push({
                pathname: "/interviewCompany",
                state: {
                    user: result.data.result
                }
            })
        }else{
            alert("로그인 실패!");
        }

    }

    const onChangeAll = inputs => {
        setInputs({ ...inputs });
        console.log("Inputs changed", inputs);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
      };
    const handleEnter = () => {
        setKeyboardOpen(false);
    }
    const  handleLanguageButton = () => {
        console.log("here");
        
        const languageToggle = language === "default" ? "english" : "default";
    
        setLanguage(languageToggle);
      }
    const onKeyPress = button => {
        console.log("Button pressed", button);
    
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{language}") handleLanguageButton();
        if (button === "{enter}") handleEnter();
      };
      const onChangeInput = event => {
        const inputVal = event.target.value;

        setInputs({
          ...inputs,
          [inputName]: inputVal
        });
    
        keyboard.current.setInput(inputVal);
      };
      const inputFocus = () => {
        setInputName("id");
        setKeyboardOpen(true);
      }
      const passInputFocus = () => {
        setInputName("pass");
        setKeyboardOpen(true);
      }
      const getInputValue = inputName => {
        return inputs[inputName] || "";
      };
    return (
        <div className="container" style={{backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"}}>
            <Navbar />
            <div className="titleContainer" style={{height:"16vh"}}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <h1 style={{fontWeight:"900", color:"rgb(235,240,240)"}}>로그인</h1>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh", fontFamily: "gmaget"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div style={divStyle}>
                <div style={loginStyle}>
                    {/* <label>연락처</label> */}
                    <div style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center", }}>
                        {/* <label><FaPhoneAlt size="35" color="grey"></FaPhoneAlt></label> */}
                        <input id="id" value ={getInputValue("id")} onChange={onChangeInput} onFocus={inputFocus} ref={phoneRef} type="number"  style={inputStyle} placeholder="  &#xf098;  연락처를'_' 없이 입력하세요."></input>
                    </div>
                    <div style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center", }}>
                        {/* <i><FaUnlockAlt size="50" color="grey"></FaUnlockAlt></i> */}
                        <input id="pass" ref={passRef} type="password" onChange={onChangeInput} value={getInputValue("pass")}style={inputStyle} onFocus={passInputFocus} placeholder="  &#61475;  비밀번호"></input>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"95%"}}>
                        <Link to="/signup"><button style={btnStyle}>회원가입</button></Link>
                        <button onClick={loginBtnClick} style={btnStyle}>로그인</button>
                    </div>
                </div>
            </div>
            <div className={`keyboardContainer ${!keyboardOpen ? "hidden" : ""}`}>
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    layoutName={layout}
                    inputName={inputName}
                    onChangeAll={onChangeAll}
                    onKeyPress={onKeyPress}
                    language={language}
                    buttonTheme={[
                        {
                          class: "hg-red",
                          buttons: "~ ! @ # $ % ^ & * ( ) _ + ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅒ ㅖ { } | : < > ?  Q W E R T Y U I O P A S D F G H J K L Z X C V B N M ` 1 2 3 4 5 6 7 8 9 0 - = {bksp} {tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ [ ] {language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ; ' {enter} {shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift} .com @ {space} q w e r t y u i o p a s d f g h j k l z x c v b n m"
                          }
                    ]}
                 />
            </div>
            <Footer />
        </div>
    )
}
