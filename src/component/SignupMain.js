import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Footer from './Footer';
import { AiOutlineHome } from 'react-icons/ai'
import Navbar from './Navbar'
import Keyboard from 'react-hangul-virtual-keyboard';
import "react-hangul-virtual-keyboard/build/css/index.css";
import Hangul from "hangul-js";
import { isConstructorDeclaration } from 'typescript';

let SIGNUP_API;
let DETAIL_SIGN_API;

const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;
let buttonArray = [];
let inputText = "";

if(IS_DEV === "true") {
    SIGNUP_API = "/api/insertUnivUser.api";
    DETAIL_SIGN_API = "/api/insertUnivUserDetail.api";
}else {
    SIGNUP_API = `${PROXY}/api/insertUnivUser.api`;
    DETAIL_SIGN_API = `${PROXY}/api/insertUnivUserDetail.api`;
}

export default function SignupMain({ history }) {
    const state = useSelector(state => state.initialReducer);
    const keyboard = useRef();
    const [layout, setLayout] = useState("default");
    const [language, setLanguage] = useState("default");
    const [inputs, setInputs] = useState({});
    const [inputName, setInputName] = useState("default");
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const ADMIN_ID = state.data.config.ADMIN_ID;

    const ageCode = state.data.ageCode;
    const eduCode = state.data.eduCode;
    const salCode = state.data.salCode;
    const crrCode = state.data.crrCode;
    const gndrCode = state.data.gndrCode;
    const worknetRegion = state.data.worknetRegion
    const worknetCode = state.data.worknetCode

    const nameInput = useRef(HTMLInputElement);
    const emailInput = useRef(HTMLInputElement);
    const phoneInput = useRef(HTMLInputElement);
    const passwordInput = useRef(HTMLInputElement);
    const passwordConInput = useRef(HTMLInputElement); 
    const ageSelect = useRef(HTMLSelectElement);
    const workCodeSelect = useRef(HTMLSelectElement);
    const eduSelect = useRef(HTMLSelectElement);
    const regionSelect = useRef(HTMLSelectElement);
    const salSelect = useRef(HTMLSelectElement);
    const crrSelect = useRef(HTMLSelectElement);
    const gndrSelect = useRef(HTMLSelectElement);

    const containerStyle ={
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100vh",
        width:"100%",
        backgroundSize: "cover",
        justifyContent: "space-between",
        overflow: "auto",
        alignItems: "center",
        userSelect: "none",
        backgroundColor: "#21D4FD",
        backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #6271b9 100%)"
    }
    const formStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: "5px",
        backgroundColor: "rgb(249, 250, 250, 0.1)",
        borderRadius: "10px",
        height: "auto",
        width: "98.5%",
        border: "0.15rem solid rgb(220, 220, 220)",
        cursor: "pointer",
    }
    const inputStyle = {
        backgroundColor: "rgba(240, 240, 245)",
        width: "65%",
        height: "7vh",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        border:"1px solid #21D4FD",
        fontSize:"18px",
        fontFamily: "FontAwesome",
        marginLeft:"5px",
        marginTop: "5px",
        fontFamily: "gmaget"
        
    }
    const textStyle = {
        width:"15%",
        // backgroundColor:"white",
        fontSize: "20px",
        fontWeight: "600",
        color: "white",
        fontFamily: "gmaget"
    }
    const selectboxStyle = {
        height: "7vh",
        width: "65%",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        border:"1px solid #21D4FD",
        backgroundColor: "rgba(240, 240, 245)",
        fontFamily: "gmaget",
        fontSize: "17px",
    }
    const btnStyle ={
        width:"99%",
        minHeight: "7vh",
        backgroundColor: "#0093E9 ",
        border:"none",
        color:"white",
        fontSize: "22px",
        fontWeight: "600",
        outline: "none",
        cursor: "pointer",
        borderRadius: "7px",
        marginTop: "2vh",
        marginBottom: "2vh",
        fontFamily: "gmaget"
        // border: "1px solid rgb(250, 250, 245)"
    }
    const goBack = () => {
        history.goBack();
    }
   const signUpBtnClick = async () => {
        const name = nameInput.current;
        const email = emailInput.current;
        const phone = phoneInput.current;
        const password = passwordInput.current;
        const passwordConf = passwordConInput.current;
        const age = ageSelect.current;
        const work = workCodeSelect.current;
        const edu = eduSelect.current;
        const region = regionSelect.current;
        const sal = salSelect.current;
        const crr = crrSelect.current;
        const gndr = gndrSelect.current;

        if(!name.value) {
            name.focus();
            return;
        }else if(!email.value) {
            email.focus();
            return;
        }else if(!phone.value) {
            phone.focus();
            return;
        }else if(!password.value) {
            password.focus();
            return;
        }else if(!passwordConf.value) {
            passwordConf.focus();
            return;
        }else if(!age.value) {
            age.focus();
            return;
        }else if(!work.value) {
            work.focus();
            return;
        }else if(!edu.value) {
            edu.focus();
            return;
        }else if(!region.value) {
            region.focus();
            return;
        }else if(!sal.value) {
            sal.focus();
            return;
        }else if(!crr.value) {
            crr.focus();
            return;
        }else if(!gndr.value) {
            gndr.focus();
            return;
        }
        
        
        if (password.value !== passwordConf.value) {
            alert("비밀번호와 비밀번호 확인이 일치하지않습니다.");
            passwordConf.focus();
            return;
        }

        const result = await axios.get(`${SIGNUP_API}?group_id=${ADMIN_ID}&user_id=${phone.value}&user_password=${password.value}&user_name=${name.value}&user_email=${email.value}&encFlag=N`);
        if(result.data.result_code === "200" && result.data.result_msg === "success") {
            const detailResult = await axios.get(`${DETAIL_SIGN_API}?group_id=${ADMIN_ID}&user_id=${phone.value}&user_age_code=${age.value}&user_job_code=${work.value}&user_edu_code=${edu.value}&user_area_code=${region.value}&user_sal_code=${sal.value}&user_career_code=${crr.value}&user_gender_code=${gndr.value}`);
            console.log(detailResult.data);
            history.push("/disitalInterview");
        }else {
            alert(result.data.result_msg);
        }
    }
    const onChangeAll = inputs => {
        console.log("All", inputs);
        
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
        //console.log(keyboard.current);
         if(keyboard.current.options.inputName === "name") {
            if (
                ![
                  "{shift}",
                  "{language}",
                  "{enter}",
                  "{bksp}",
                  "{space}",
                  "{tab}"
                ].includes(button)
              ) {
                buttonArray.push(button);
              }
              if (button === "{bksp}") {
                buttonArray.pop();
              }
              if (button === "{space}") {
                buttonArray.push(" ");
              }
              if (button === "{tab}") {
                buttonArray.push("  ");
              }
              
              inputText = Hangul.assemble(buttonArray);

              setInputs({
                ...inputs,
                [inputName]: inputText
              });

              //console.log("buttonArray", buttonArray)
              //console.log("inputText", inputText)
              //console.log(keyboard.current);
              //console.log("ddd", keyboard.current.input.name);
         }
       //return inputText = Hangul.assemble(buttonArray);
        
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
        setInputName("name");
        setKeyboardOpen(true);
      }
      const passInputFocus = () => {
        setInputName("pass");
        setKeyboardOpen(true);
      }
      const passComInputFocus = () => {
        setInputName("passCom");
        setKeyboardOpen(true);
      }
      const emailFocus = () => {
        setInputName("email");
        setLanguage("english");
        setKeyboardOpen(true);
      }
      const phoneFocus = () => {
        setInputName("phone");
        setKeyboardOpen(true);
      }
      const getInputValue = inputName => {
          //console.log("getInputValue", inputs[inputName])
        return inputs[inputName] || "";
      };
      useEffect(() => {
          console.log("띵")
          if (inputText !== "") {
            console.log("똥")
                inputText = "";
                nameInput.current.value = "";
                buttonArray = [];
          }

      }, [])
    // console.log(buttonArray)
    // console.log("네임벨류", nameInput.current.value);
    // console.log("inputText", inputText)
    return (
        <div style={containerStyle}>
            <Navbar />
            <div className="titleContainer" style={{height:"15vh"}}>
                <button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh"}} onClick={goBack}><FaArrowLeft size="45" color="#ffff" /><br/>뒤로</button>
                <h1 style={{fontWeight:"900", color:"rgb(235,240,240)"}}>회원가입</h1>
                <Link to="/menuAll"><button style={{backgroundColor:"rgb(255,255,255,0)", fontSize:"2vh"}}><FaBars size="45" color="#ffff"/><br/>메뉴</button></Link>
            </div>
            <div className="signUp">
            <h1 style={{color:"white"}}>회원정보 입력</h1>
                <div style={formStyle}> 
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>성명</label><input id="name" value ={inputText} onChange={onChangeInput} onFocus={inputFocus} ref={nameInput} type="text" style={inputStyle} placeholder=" 이름을 입력하세요."></input>
                    </div>
                </div>
                <div style={formStyle}> 
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>이메일</label><input id="email" value ={getInputValue("email")} onChange={onChangeInput} onFocus={emailFocus} ref={emailInput} type="email" style={inputStyle} placeholder=" 이메일을 입력하세요."></input>
                    </div>
                </div>
                
                <div style={formStyle}> 
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>연락처</label><input id="phone" value ={getInputValue("phone")} onChange={onChangeInput} onFocus={phoneFocus} ref={phoneInput} type="number"style={inputStyle} placeholder=" 연락처를 '_' 없이 입력하세요."></input>
                    </div>
                </div>
                <div style={formStyle}> 
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>비밀번호</label> <input id="pass" value ={getInputValue("pass")} onChange={onChangeInput} onFocus={passInputFocus} ref={passwordInput} type="password" style={inputStyle} placeholder=" 비밀번호를 입력하세요."></input>
                    </div>
                </div>
                <div style={formStyle}> 
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>비밀번호확인</label><input id="passCom" value ={getInputValue("passCom")} onChange={onChangeInput} onFocus={passComInputFocus}ref={passwordConInput} type="password" style={inputStyle} placeholder=" 비밀번호를 재입력하세요."></input>
                    </div>
                </div>
                <h1 style={{color:"white"}}>추가정보 입력</h1>
                <div style={formStyle}> 
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>연령</label><select onFocus={() => setKeyboardOpen(false)} ref={ageSelect} style={selectboxStyle}>
                                <option value="">연령선택</option>
                            {ageCode && ageCode.map((code, index) => (
                                <option key={index} value={code.code}>{code.value}</option>
                            ))}</select>
                    </div>
                </div>
                <div style={formStyle}>
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>구직/직종</label><select onFocus={() => setKeyboardOpen(false)} ref={workCodeSelect}style={selectboxStyle}>
                            <option  value="">희망직종 선택</option>
                            {worknetCode && worknetCode.map((code, index) => (
                                <option key={index} value={code.code}>{code.value}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={formStyle}>
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>학력</label><select ref={eduSelect}style={selectboxStyle}>
                            <option  value="">학력선택</option>
                            {eduCode && eduCode.map((code, index) => (
                                <option key={index} value={code.code}>{code.value}</option>
                            ))}
                            </select>
                    </div>
                </div>
                <div style={formStyle}>
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>근무 희망지역</label><select ref={regionSelect} style={selectboxStyle}>
                            <option  value="">근무희망지역 선택</option>
                            {worknetRegion && worknetRegion.map((code, index) => (
                                <option key={index} value={code.code}>{code.value}</option>
                            ))}
                            </select>
                    </div>
                </div>
                <div style={formStyle}>
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>희망급여</label><select ref={salSelect}style={selectboxStyle}>
                            <option  value="">희망급여 선택</option>
                            {salCode && salCode.map((code, index) => (
                                <option key={index} value={code.code}>{code.value}</option>
                            ))}
                            </select>
                    </div>
                </div>
                <div style={formStyle}>
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>경력</label><select ref={crrSelect} style={selectboxStyle}>
                            <option  value="">경력선택</option>
                            {crrCode && crrCode.map((code, index) => (
                                <option key={index} value={code.code}>{code.value}</option>
                            )) }
                            </select>
                    </div>
                </div>
                <div style={formStyle}>
                    <div style={{display:"flex", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
                        <label style={textStyle}>성별</label><select ref={gndrSelect} style={selectboxStyle}>
                            <option  value="">성별선택</option>
                            {gndrCode && gndrCode.map((code, index) => (
                                <option key={index} value={code.code}>{code.value}</option>
                            ))}
                        </select>
                    </div>
                </div>
                    <button style={btnStyle} onClick={signUpBtnClick}>회원가입</button>
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
            {/* <Footer /> */}
            <div className="footer">
                <Link to="/" style={{textDecoration:"none"}}><span style={{color:"white", fontSize:"large", display:"flex", justifyContent:"center", alignItems:"flex-end", marginRight:"7px"}}><AiOutlineHome size="32" color="#ffff"/>Home</span></Link>
            </div>
        </div>
    )
}