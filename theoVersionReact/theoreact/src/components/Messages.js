import React, { Component } from "react";
import "./stylesheets/messages.css";
import { Consumer } from "../context";
import Message from "./Message";

class Messages extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    window.$.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/messages/sent",
      headers: { "X-MSG-AUTH": token },
      dataType: "json",
      async: true,
      success: data => {
        this.setState({
          messages: data
        });
      },
      error: () => {}
    });
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          const { messages } = this.state;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <div class="container">
                <div class="row col-md-6 col-md-offset-2 custyle">
                  <a href="#" class="btn btn-primary btn-xs pull-right">
                    <b>+</b> Send new Message
                  </a>
                  <table class="table table-striped custab">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Sender</th>
                        <th>Text</th>
                        <th>Date</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map(message => {
                        return <Message key={message.id} message={message} />;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Messages;
