import React, { Component } from "react";
import { Consumer } from "../context";

class Logout extends Component {
  componentDidMount() {}

  logout = (loggedIn, loggedInUser, token, dispatch) => {
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
    // dispatch({ type: "SET_LOGGED_IN_BOOLEAN", payload: false });
    // dispatch({ type: "FILL_LOGGEDINUSER", payload: {} });
    // dispatch({ type: "FILL_TOKEN_IN_STATE", payload: "" });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, loggedInUser, token, dispatch } = value;
          this.logout(loggedIn, loggedInUser, token, dispatch);
        }}
      </Consumer>
    );
  }
}

export default Logout;
