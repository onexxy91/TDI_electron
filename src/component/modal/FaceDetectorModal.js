import React from 'react'
import ReactModal from 'react-modal';
import logo from './logo.svg';
import '../../App.css'
const FaceDetectorModal = (props) =>{

    return (
        <ReactModal isOpen={props.selectedNews}
            contentLabel="modal Example" 
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: "rgba(3, 3, 3, 0)"
                },
                content: {
                    top: 0,
                    bottom: 0,
                    left: "0px",
                    right:"0px",
                    backgroundColor: "rgba(3, 3, 3, 0.500)"
                }}}> 
                <div className="top">
                    {/* <p>이용안내</p> */}
                    {/* <p style={triangleup}></p> */}
                </div>
                /* <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
          </div> 
        </ReactModal>
    )
}

export default FaceDetectorModal;