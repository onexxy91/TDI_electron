import  { Route, Switch, useLocation } from 'react-router-dom'
import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Transition.css'
import Main from '../component/Main';
import JobMain from '../component/JobMain';
import JobAll from '../component/JobAll';
import MenuAll from '../component/MenuAll';
import CenterNews from '../component/CenterNews';
import SettingLogin from '../component/SettingLogin';
import SettingMenu from '../component/SettingMenu';
import Centerintro from '../component/Centerintro';
import FunFunMain from '../component/FunFunMain';
import FaceDetector from '../component/FaceDetector';
import test from '../component/Test';
import DisitalInterview from '../component/DisitalInterview';
import InterviewLogin from '../component/InterviewLogin';
import Signup from '../component/Signup';
import SignupMain from '../component/SignupMain';
import DisitalInterviewReal from '../component/DisitalInterviewList';
import DisitalInterviewDutyList from '../component/DisitalInterviewDutyList';

export default function Router() {
    const location = useLocation();
    console.log("Router", location);

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
                path={process.env.PUBLIC_URL + "#/"}>
                  <Main />
              </Route>
              <Route path="/jobInfo"> <JobMain /></Route>
              <Route path="/menuAll" exact component={MenuAll} />
              <Route path={['/jobAll',
                           '/realJobInfo',
                           '/youthJobInfo',
                           '/middleJobInfo',
                           '/womenJobInfo',
                           '/disJobInfo',
                           '/smallJobInfo',
                           '/openJobInfo'
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
              {/* <Route path="/test" component={test} /> */}
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    )
}