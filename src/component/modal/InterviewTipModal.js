import React from 'react'
import ReactModal from 'react-modal'





export default function InterviewTipModal( props ) {
    console.log(props);
    const textStyle = {
        flex: "1",
        fontSize: "2vh",
        fontWeight: 600,
        borderRight: "0.1rem solid rgba(128, 128, 128, 0.329)",
        marginLeft: "5px",
        marginTop: "10px",
        marginBottom: "10px",
        color: "black"
    }
    const valueStyle= {
        flex: "2",
        fontSize: "2vh",
        fontWeight: "500",
        marginLeft: "7px",
        whiteSpace: "pre-wrap",
        color: "rgb(116, 113, 112)",
        /* background-color: honeydew;  */
    }
    return (<ReactModal isOpen={props.isOpen}
        contentLabel="modal Example" 
        ariaHideApp={false}
        style={{
            content: {
                top: '5vh',
                bottom: '4vh',
                left:'30vh',
                right:'30vh'
            }
        }}>
             {props.dutyDetail && <div className="modalContainer">
                <div className="top">
                    <p id="title">{props.company.interview_title} / {props.duty.interview_duty_title}  Tip </p>
                </div>
                <div className='recruitInfo'>
                    {props.dutyDetail.map((detail, index) => 
                        (<div key={index} className='subTitle'>{index +1}번째 질문
                        <div className='row'>
                            <span style={textStyle}>{detail.interview_detail_title}</span>
                            <span style={valueStyle}>{detail.interview_detail_tip}</span>
                        </div>
                        </div>)
                    )}
                </div>
                {props.type != 'R' ?
                (<div className="btnGroup">
                    {/* <button onClick={props.closeRecruit} className="closeBtn">스크랩</button> */}
                    <button onClick={props.uploadSelf} className="closeBtn">나에게보내기</button>
                    <button onClick={props.upload} className="closeBtn">담당자에게보내기</button>
                    <button onClick={props.closeModal} className="closeBtn">닫기</button>
                    {/* <button onClick={props.closeRecruit} className="closeBtn">프린트하기</button> */}
                </div>):(<div className="btnGroup">                    
                    <button onClick={props.upload} className="closeBtn">담당자에게보내기</button>
                    <button onClick={props.closeModal} className="closeBtn">닫기</button>
                </div>)
                }
                </div>
             }
    </ReactModal>)
}