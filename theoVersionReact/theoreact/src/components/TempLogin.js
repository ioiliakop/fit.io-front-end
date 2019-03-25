import React, { Component } from "react";

class TempLogin extends Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const url = "http://localhost:8080/login/user";
    const loginData = {
      username: this.username.current.value,
      password: this.password.current.value
    };

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(loginData), // data can be `string` or {object}!
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json().then(function(data) {
          console.log(data);
          // TODO: handle token to localstorage logic
        });
      })
      .catch(error => console.error("Error:", error));

    // ajax old code, never worked and busted balls
    // window.$.ajax({
    //     url: 'http://localhost:8080/login/user',
    //     dataType: 'json',
    //     type: 'POST',
    //     data: {
    //         username: u,
    //         password: p
    //     }
    // }).then(json => {
    //     console.log('Succesfully sent');
    //     console.log(JSON.stringify(json));
    // localStorage.setItem('token', json.token);
    // });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="form-group col-sm-4 mx-auto text-center">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              ref={this.username}
              required
            />
          </div>
          <div className="form-group col-sm-4 mx-auto text-center">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              ref={this.password}
              required
            />
          </div>
        </div>
        <div className="container">
          <button
            type="submit"
            className="btn btn-primary btn-block col-sm-4 mx-auto"
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default TempLogin;
