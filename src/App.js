import  {  Route, Switch } from 'react-router-dom'
import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './routes/Transition.css'
import Main from './component/Main';
import JobMain from './component/JobMain';
import JobAll from './component/JobAll';
import MenuAll from './component/MenuAll';
import CenterNews from './component/CenterNews';
import SettingLogin from './component/SettingLogin';
import SettingMenu from './component/SettingMenu';
import Centerintro from './component/Centerintro';
import FunFunMain from './component/FunFunMain';
import FaceDetector from './component/FaceDetector';
import DisitalInterview from './component/DisitalInterview';
import InterviewLogin from './component/InterviewLogin';
import Signup from './component/Signup';
import SignupMain from './component/SignupMain';
import DisitalInterviewReal from './component/DisitalInterviewList';
import DisitalInterviewDutyList from './component/DisitalInterviewDutyList';
import TodayEng from './component/TodayEng';
import EveryDayQuiz from './component/EveryDayQuiz'
import './App.css';
import InterviewRecord from './component/InterviewRecord';
import JobTest from './component/jobTest/JobTest';
import CustomAPI1 from './component/CustomAPI1';
import CustomAPI2 from './component/CustomAPI2';
import DisitalInterviewDutyDetail from './component/DisitalInterviewDutyDetail';


function App() {
  
  //console.log("window", window);
  //console.log('electron', electron);
  //const ipcRenderer = electron.ipcRenderer;
  //console.log('ipcRenderre', ipcRenderer);
  //const dialog = electron.remote.dialog;
  // console.log("dialog", dialog);

  // ipcRenderer.on('asynchronous-reply', (event, arg) => {
  //  console.log('arg', arg.info) // prints "pong"
  //  const data = JSON.parse(arg);
  //  console.log(data.faces[0]);
  //  console.log(data.faces[0].gender.value);
  // })

  // ipcRenderer.on('asynchronous-message', (event, arg) => {
  //   console.log(arg) // prints "pong"
  //  })
  // ipcRenderer.send('asynchronous-message', 'ping');
  //const openDialog = () => {

  //   dialog.showOpenDialog(electron.remote.BrowerWindow, {
  //     defaultPath: electron.remote.app.getPath('desktop'),
  //     properties: ['openFile'],
  //     filters:[
  //       { name: 'Images', extensions: ['pdf'] },
  //       { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
  //     ]
  //   }).then(result => {
  //     console.log(result.filePaths);
  //     ipcRenderer.send('asynchronous-message', result.filePaths);
  //     window.location.href = result.filePaths;
  //   }).then(args => {
  //     console.log("args", args);
     
  //   }).catch(err => {
  //     console.log(err);
  //   })
  //   //window.print();
  //   //setTimeout(window.close(), 3000);
  // }

  return (
  //  <HashRouter>
      <Route render={({location}) => {
        console.log(location);
        return (
     <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.pathname}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>
              <Route
                exact
                path="/">
                  <Main />
              </Route>
              <Route path="/jobInfo" exact component={JobMain} /> 
              <Route path="/menuAll" exact component={MenuAll} />
              <Route path={['/jobAll',
                           '/realJobInfo',
                           '/youthJobInfo',
                           '/middleJobInfo',
                           '/womenJobInfo',
                           '/disJobInfo',
                           '/smallJobInfo',
                           '/openJobInfo',
                           '/hsJobInfo',
                           '/pnJobInfo'
                           ]} exact component={JobAll} />
              <Route path="/centerNews" exact component={CenterNews} />
              <Route path="/setting" component={SettingLogin} />
              <Route path="/settingMenu" component={SettingMenu} />
              <Route path="/centerintro" component={Centerintro} />
              <Route path="/funfun" component={FunFunMain} />
              <Route path="/faceDetector" component={FaceDetector} />
              {/* <Route path="/faceDetector" render={(props) => (<FaceDetector ipc={props.ipc}/> )}/> */}
              <Route path="/disitalInterview" component={DisitalInterview} />
              <Route path="/interviewCompany" component={DisitalInterviewReal} />
              <Route path="/interviewLogin" component={InterviewLogin} />
              <Route path="/signup" component={Signup} />
              <Route path="/signupMain" component={SignupMain} />
              <Route path="/interviewDutyList" component={DisitalInterviewDutyList} />
              <Route path="/interviewDutyDetail" component={DisitalInterviewDutyDetail} />
              <Route path="/interviewRecord" component={InterviewRecord} />
              <Route path="/todayEng" component={TodayEng} />
              <Route path="/jobTest" component={JobTest} />
              <Route path="/everyQuiz" component={EveryDayQuiz} />
              <Route path="/customAPI1" component={CustomAPI1} />
              <Route path="/customAPI2" component={CustomAPI2} />
              {/* <Route path="/test" component={test} /> */}
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
      )
    }}></Route>
   //</HashRouter>
  );
}

export default App;
