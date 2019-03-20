import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
        <div id="searcharea" class="jumbotron jumbotron-fluid big-banner">
        <div class="container">
          <p class="text-center h1 text-white font-weight-bolder">Find your personal trainer today!</p>
          <p class="text-center h6 pb-3 text-white">Start training that booty!!!</p>
          <form class="form-inline row justify-content-between">
            <input type="text" id="username" class="form-control form-control-lg mr-0 col-sm-5" placeholder="Choose area"/>
            <input type="text" id="password" class="form-control form-control-lg mr-0 col-sm-5" placeholder="Or choose workout style"/>
            <button class="btn btn-primary btn-lg col-sm-2" type="submit">Search</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Main;