import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Register from "./components/Register";
import TempLogin from "./components/TempLogin";
import Messages from "./components/Messages";
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
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={TempLogin} />
          <Route path="/register/:rolename" exact component={Register} /> {/*needs consideration to restrain possible values/routes*/}
          <Route path="/messages" exact component={Messages} />
          <Footer />
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;