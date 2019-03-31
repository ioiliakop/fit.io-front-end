import React, { Component } from 'react';
import LandingMainSearch from './LandingMainSearch';

class LandingMain extends Component {
  render() {
    return (
        <div id="searcharea" className="jumbotron jumbotron-fluid big-banner">
        <div className="container">
          <p className="text-center h1 text-white font-weight-bolder">Find your personal trainer today!</p>
          <p className="text-center h6 pb-3 text-white">Start training that booty!!!</p>
          {/* <form className="form-inline row justify-content-between">
            <input type="text" id="username" className="form-control form-control-lg mr-0 col-sm-5" placeholder="Choose area"/>
            <input type="text" id="password" className="form-control form-control-lg mr-0 col-sm-5" placeholder="Or choose workout style"/>
            <button className="btn btn-primary btn-lg col-sm-2" type="submit">Search</button>
          </form> */}
          <LandingMainSearch />
        </div>
      </div>
    );
  }
}

export default LandingMain;