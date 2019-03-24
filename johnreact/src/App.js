import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Register from "./components/Register";
import TempLogin from "./components/TempLogin";
import Messages from "./components/Messages/Messages";
import InboxMessages from './components/Messages/InboxMessages';
import OutboxMessages from './components/Messages/OutboxMessages';
import './App.css';
import UserContext from './context/user-context';

class App extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   userCntxt: this.props.userProps
    // }

    // Setter method for userContext which is included in userContext
    this.updateUserContext = () => {
      this.setState( () => ({
        // isLoggedIn: state.isLoggedIn,
        // token: state.token,
        // userInfo: state.userInfo

        // attempt to refactor to updating state directly from localstorage (we consider it the single source of truth)
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
          <Switch>
            <Route path="/register/:rolename" exact component={Register} /> {/*needs consideration to restrain possible values/routes*/}
            <Route path="/messages/out" exact component={OutboxMessages} />
            <Route path="/messages/in" exact component={InboxMessages} />
            {/* <Route path="/messages/out" exact render={() => <Messages folderType='outbox' />} /> */}
            <Route path="/login" exact component={TempLogin} />
            <Route path="/" component={Landing} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;