import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../logo.svg';
// import logo from '../innospeechLogo1.png';
import { getData } from '../redux/action/initAction';
import Home from './Home';
import  { faceDetect } from './FaceDetector';


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
ipcRenderer.send('synchronous-message', 'ping');

export default function Main() {
    // console.log("main.js !!!", config);
    const data = useSelector((state) => state.initialReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        try {
            ipcRenderer.on('asynchronous-message', (event, arg) => {
                //console.log('electron ipcrenderer', arg);
                getData(arg).then(result => {
                    dispatch(result)        
                })    
              })

        } catch (error) {
            console.log(error);
        }
        faceDetect();
    }, [])

    return (<section>
       {data.isLoading ? 
            (<div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
          </div>) :(<Home />)
        }
        </section>
    );
}