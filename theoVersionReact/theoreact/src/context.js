import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    loggedIn: localStorage.getItem("token") == "" ? false : true,
    trainingSessions: [],
    token: "",
    loggedInUser: {},
    inbox: [],
    outbox: [],
    dispatch: action => this.setState(state => this.reducer(state, action))
  };

  reducer = (state, action) => {
    switch (action.type) {
      case "SET_LOGGED_IN_BOOLEAN":
        this.setState({
          loggedIn: action.payload
        });
      case "FILL_TRAINING_SESSIONS":
        return {
          ...state,
          trainingSessions: action.payload
        };
      case "FILL_LOGGEDINUSER":
        return {
          ...state,
          loggedInUser: action.payload
        };
      case "FILL_TOKEN_IN_STATE":
        console.log("ta minimata apothikevontai kai sto context.js");
        this.setState({
          token: action.payload
        });
      case "FILL_INBOX_MESSAGES":
        this.setState({
          inbox: action.payload
        });
      case "TEST":
        console.log("to state einaii ayti ti stigmi");
        console.log(this.state);
      default:
        return state;
    }
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token !== "") {
      window.$.ajax({
        type: "GET",
        url: "http://localhost:8080/login/userFromToken",
        headers: { "X-MSG-AUTH": token },
        dataType: "json",
        async: true,
        success: user => {
          localStorage.setItem("user", JSON.stringify(user));
          this.setState({
            loggedInUser: user,
            loggedIn: true,
            token: token
          });
        },
        error: () => {
          localStorage.setItem("user", "");
          localStorage.setItem("token", "");
          this.setState({
            loggedInUser: "",
            loggedIn: false,
            token: ""
          });
        }
      });
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
