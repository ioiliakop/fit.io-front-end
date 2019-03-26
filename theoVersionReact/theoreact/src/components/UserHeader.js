import React, { Component } from "react";
import { Consumer } from "../context";
import { Link, withRouter } from "react-router-dom";

class UserHeader extends Component {
  goToMessages = (token, dispatch) => {
    window.$.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/messages/sent",
      headers: { "X-MSG-AUTH": token },
      dataType: "json",
      async: true,
      success: messages => {
        dispatch({ type: "FILL_INBOX_MESSAGES", payload: messages });
        // dispatch({ type: "TEST", payload: "" });
        this.props.history.push("/messages");
      },
      error: () => {
        alert("errorr");
      }
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, token, dispatch } = value;
          return (
            <React.Fragment>
              {loggedIn ? (
                <nav class="navbar navbar-light navbar-expand-md bg-warning">
                  <div class="container">
                    <div class="btn-group btn-group-toggle mr-2">
                      <label class="btn btn-secondary">
                        <Link style={{ color: "white" }} to="/myProfile">
                          My Profile
                        </Link>
                      </label>
                      <label class="btn btn-secondary">
                        <Link to="#" style={{ color: "white" }}>
                          My Training Sessions
                        </Link>
                      </label>
                      <label class="btn btn-secondary">
                        <Link
                          onClick={this.goToMessages.bind(
                            this,
                            token,
                            dispatch
                          )}
                          style={{ color: "white" }}
                          to="/messages"
                        >
                          My Messages
                        </Link>
                      </label>
                      <label class="btn btn-secondary">
                        <Link to="#" style={{ color: "white" }}>
                          My Reviews
                        </Link>
                      </label>
                    </div>
                  </div>
                </nav>
              ) : null}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withRouter(UserHeader);
