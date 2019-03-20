import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Header";
import Main from "./components/Main";
import ThreeSteps from "./components/ThreeSteps";
import ReadyToGetStarted from "./components/ReadyToGetStarted";
import Footer from "./components/Footer";
import Register from "./components/Register";
import './App.css';

class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" render= {props =>(
                                    <React.Fragment>
                                          <Main />
                                          <ThreeSteps />
                                          <ReadyToGetStarted />
                                          <Footer />
                                    </React.Fragment>
                           )} />
                           {/* to component thelei mikro stin arxi oxi kefalaiop */}
            <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
