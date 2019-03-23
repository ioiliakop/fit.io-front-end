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
  }

  render() {
    return (
      <Router>
        <UserContext.Provider value={this.props.userProps}>
          <Header />
          <Switch>
            <Route path="/register/:rolename" exact component={Register} /> {/*needs consideration to restrain possible values/routes*/}
            <Route path="/messages/in" exact component={InboxMessages} />
            <Route path="/messages/out" exact component={OutboxMessages} />
            {/* <Route path="/messages/out" exact render={() => <Messages folderType='outbox' />} /> */}
            <Route path="/login" component={TempLogin} />
            <Route path="/" component={Landing} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;