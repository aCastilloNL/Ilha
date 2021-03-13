import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Video from './components/video-page/Video';
import Signin from './components/signin/Signin';
import Signup from './components/sign-up/Signup';
import { UserRoute } from './components/privateRoute';
import UserProfile from './components/userProfile/UserProfile';
import Messages from './components/messages/Messages';
import Agenda from './components/agenda/Agenda';
import Files from './components/files/Files';
import StudentList from './components/studentList/StudentList';
import TeacherList from './components/teacherList/TeacherList';
import EditProfile from './components/userProfile/EditProfile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/Dashboard" component={Dashboard} /> */}

        <Route path="/Video" component={Video} />
        <Route path="/myProfile" component={UserProfile} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/messages" component={Messages} />
        <Route path="/agenda" component={Agenda} />
        <Route path="/files" component={Files} />

        <UserRoute path="/Dashboard">
          <Dashboard />
        </UserRoute>
        <UserRoute path="/videoroom/:roomId" component={Video} />
        <UserRoute path="/students" component={StudentList} />
        <UserRoute path="/teachers" component={TeacherList} />
      </Switch>
    </Router>
  );
}

export default App;
