import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaBars, FaUnlockAlt } from 'react-icons/fa'
import { Link, Router } from 'react-router-dom'
import Navbar from './Navbar'
// import Keyboard from 'react-hangul-virtual-keyboard';
// import "react-hangul-virtual-keyboard/build/css/index.css";
import ForbiddenModal from './modal/ForbiddenModal'
import { useSelector } from 'react-redux';



//const electron = window.require('electron');

export default function SettingLogin({ history, location }) {
    const initData = useSelector(state => state.initialReducer);
    const inputRef = useRef();
    const keyboard = useRef();
    const [layout, setLayout] = useState("default");
    const [language, setLanguage] = useState("english");
    // const [input, setInput] = useState("");
    // const [inputName, setInputName] = useState("default");
    // const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const ADMIN_ID = initData.data.config.ADMIN_ID;
    
    const goBack = () => {
        history.goBack()
    }
    

    const btnStyle = {
        width:"65%",
        height: "4.5vh",
        backgroundColor: "#0093E9",
        backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        border:"none",
        color:"white",
        outline: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontFamily: "gmaget",
        fontSize: "18px"
    }
    const divStyle= {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "73vh",
            width: "100%",
            // backgroundColor:"aqua"
    }
    const boxStyle = {
        display:"flex",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "25%",
        height: "60vh",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius:"5px"

    }
    const inputStyle = {
        backgroundColor: "rgba(240, 240, 255)",
        width: "40ch",
        height: "5vh",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        border:"none",
    }
    const passwordConf = () => {
        const passValue = inputRef.current.value;
        if (passValue === ADMIN_ID) {
            //console.log('passWord ok');
            history.push("/settingMenu");
        }else {
            setIsOpen(true);
            //electron.remote.dialog.showMessageBox(null, options);
            //alert('관리자번호가 틀립니다.');
            //console.log('passWord no');
        }
        inputRef.current.value = "";
        inputRef.current.focus();
    }
    const modalClose = () => {
        setIsOpen(false);
    }
    useEffect(() => {
        inputRef.current.focus();
    }, [])

    // const onChange = input => {
    //     /**
    //   * Here we spread the inputs into a new object
    //   * If we modify the same object, react will not trigger a re-render
    //   */
    //  setInput(input);
    //  console.log("Inputs changed", input);
    //  };
 
    //  const handleShift = () => {
    //      const newLayoutName = layout === "default" ? "shift" : "default";
    //      setLayout(newLayoutName);
    //    };
    //  const handleEnter = () => {
    //      setKeyboardOpen(false);
    //  }
    //  const  handleLanguageButton = () => {
    //      console.log("here");
         
    //      const languageToggle = language === "default" ? "english" : "default";
     
    //      setLanguage(languageToggle);
    //    }
    //  const onKeyPress = button => {
    //      console.log("Button pressed", button);
     
    //      /**
    //       * If you want to handle the shift and caps lock buttons
    //       */
    //      if (button === "{shift}" || button === "{lock}") handleShift();
    //      if (button === "{language}") handleLanguageButton();
    //      if (button === "{enter}") handleEnter();
    //    };

    //    const onChangeInput = event => {
    //     const input = event.target.value;
    //     setInput(input);
    //     keyboard.current.setInput(input);
    //    };

    //    const passInputFocus = () => {
    //      setInputName("pass");
    //      setKeyboardOpen(true);
    //    }
      
    return (
        <div className="container"  style={{backgroundColor: "#0093E9",
        backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"}}>
            <Navbar />
            <div className="titleContainer" style={{height:"21vh"}}>
            <button style={{backgroundColor:"rgb(255,255,255,0)", 
                                    border:"none", 
                                    color:"white", 
                                    outline: "none", 
                                    cursor: "pointer",
                                    fontSize:"20px",
                                    fontFamily: "gmaget"}}
                            onClick={goBack}><FaArrowLeft size="50" color="#ffff" /><br/>뒤로
            </button>
                <label style={{fontSize:"4vh", fontWeight:"600", color:"white"}}>관리자 설정</label>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", 
                                                    border:"none", 
                                                    color:"white", 
                                                    outline: "none", 
                                                    cursor: "pointer",
                                                    fontSize:"20px",
                                                    fontFamily: "gmaget"}}>
                    <FaBars size="50" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div style={divStyle}>
                <div style={boxStyle}>
                <i><FaUnlockAlt size="40" color="grey"></FaUnlockAlt></i>
                    {/* onChange={onChangeInput} value={input} onFocus={passInputFocus}*/}
                    <input id="pass" ref={inputRef} style={inputStyle} type="password"></input>
                    <button style={btnStyle} onClick={passwordConf}>확인</button>
                </div>
            </div>
            {/* <div className={`keyboardContainer ${!keyboardOpen ? "hidden" : ""}`}>
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    layoutName={layout}
                    inputName={inputName}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    language={language}
                    buttonTheme={[
                        {
                          class: "hg-red",
                          buttons: "~ ! @ # $ % ^ & * ( ) _ + ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅒ ㅖ { } | : < > ?  Q W E R T Y U I O P A S D F G H J K L Z X C V B N M ` 1 2 3 4 5 6 7 8 9 0 - = {bksp} {tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ [ ] {language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ; ' {enter} {shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift} .com @ {space} q w e r t y u i o p a s d f g h j k l z x c v b n m"
                          }
                    ]}
                 />
            </div> */}
            <ForbiddenModal
                isOpen = {isOpen}
                close = {modalClose}
                message= "관리자 번호가 맞지 않습니다. 확인 후 재시도 해주세요"
                />
        </div>
    )
}