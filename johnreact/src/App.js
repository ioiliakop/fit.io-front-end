import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Register from "./components/Register";
import TempLogin from "./components/TempLogin";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={TempLogin} />
        <Route path="/register/:rolename" component={Register} /> {/*not working yet - todo fix*/}
        <Footer />
      </Router>
    );
  }
}

export default App;