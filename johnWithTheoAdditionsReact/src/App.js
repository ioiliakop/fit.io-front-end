import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer";
import Register from "./components/Register";
import InboxMessages from './components/Messages/InboxMessages';
import OutboxMessages from './components/Messages/OutboxMessages';
import UserContext from './context/user-context';
import UserNavbar from './components/User/UserNavbar';
import PastTrainingSessions from './components/TrainingSessions/PastTrainingSessions';
import FutureTrainingSessions from './components/TrainingSessions/FutureTrainingSessions';
import MyAccount from './components/User/MyAccount';
import AdminTestPage from './components/Admin/AdminTestPage';
import MyTrainingTypes from './components/User/MyTrainingTypes';
import TrainersSearch from './components/User/TrainersSearch';
import TrainerProfile from './components/User/TrainerProfile';
import TrainersCalendar from './components/User/TrainersCalendar';
import BookTrainingSession from './components/TrainingSessions/BookTrainingSession';

class App extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   userCntxt: this.props.userProps
    // }

    // Setter method for userContext which will be included in userContext
    this.updateUserContext = () => {
      this.setState(() => ({
        // isLoggedIn: state.isLoggedIn,
        // token: state.token,
        // userInfo: state.userInfo

        // decided to update state directly from localstorage (we consider it the single source of truth)
        // looks like there could be issues. db is single source of truth
        // will revisit this. makes it complicated to update attributes in memory
        isLoggedIn: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token') && localStorage.getItem('token'),
        userInfo: localStorage.getItem('token') && JSON.parse(localStorage.getItem('userInfo')),
      }));
    };

    this.state = {
      isLoggedIn: this.props.userProps ? true : false,
      token: this.props.userProps ? this.props.userProps.token : '',
      userInfo: this.props.userProps ? this.props.userProps.userInfo : {},
      updateUserContext: this.updateUserContext
    };

    console.log('App state in constructor:', this.state);
  }

  render() {
    return (
      <Router>
        <UserContext.Provider value={this.state}> {/* Passing this state as UserContext value */}
          <Header />
          {/* {this.state.isLoggedIn && <UserNavbar />} */}
          <UserNavbar />
          <Switch>
            <Route path="/admin" exact component={AdminTestPage} />  {/* Testing withAuthorization HOC - OK */}
            <Route path="/register/:rolename" exact component={Register} /> {/*perhaps needs consideration to restrain possible values/routes*/}
            <Route path="/messages/out" exact component={OutboxMessages} />
            <Route path="/messages/" exact component={InboxMessages} />
            {/* <Route path="/messages/out" exact render={() => <Messages folderType='outbox' />} /> */}
            <Route path="/training-sessions/past" exact component={PastTrainingSessions} />
            <Route path="/training-sessions" exact component={FutureTrainingSessions} />
            <Route path="/myaccount" exact component={MyAccount} />
            <Route path="/my-training-types" exact component={MyTrainingTypes} />
            <Route path="/trainers" exact component={TrainersSearch} />
            <Route path="/trainer-profile/:trainerId" exact component={TrainerProfile} />
            <Route path="/trainersCalendar/:id" component={TrainersCalendar} />
            <Route path="/bookTrainingSession" component={BookTrainingSession} />
            {/* <Route path="/login" exact component={TempLogin} /> */}
            <Route path="/" component={Landing} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;