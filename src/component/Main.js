import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../logo.svg';
import { getData } from '../redux/action/initAction';
import Home from './Home';
import  { faceDetect } from './FaceDetector';


export default function Main() {
    console.log("main.js !!!");
    const data = useSelector((state) => state.initialReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            getData().then(result => {
                dispatch(result)        
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