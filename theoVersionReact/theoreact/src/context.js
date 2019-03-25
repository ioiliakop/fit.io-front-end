import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    loggedIn: localStorage.getItem("token") ? true : false,
    trainingSessions: [],
    token: "",
    loggedInUser: {},
    inbox: [],
    outbox: [],
    dispatch: action => this.setState(state => this.reducer(state, action))
  };

  reducer = (state, action) => {
    switch (action.type) {
      case "DELETE_CONTACT":
        return {
          ...state,
          contacts: state.contacts.filter(
            contact => contact.id !== action.payload
          )
        };
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
        this.setState({
          token: action.payload
        });
      case "FILL_INBOX_MESSAGES":
        this.setState({
          inbox: action.payload
        });
      default:
        return state;
    }
  };

  componentDidMount() {}

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
