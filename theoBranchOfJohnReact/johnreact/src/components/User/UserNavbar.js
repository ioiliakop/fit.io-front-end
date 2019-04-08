import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import withAuthorization from "../../hoc/withAuthorization";
import Role from "../Role";
import $ from "jquery";

// decides whether item is active or not
function NavLink(props) {
  if (props.location === "/")
    return (
      <Link
        className="list-group-item list-group-item-secondary list-group-item-action"
        to={props.to}
      >
        {props.label}
      </Link>
    );
  if (props.to.includes(props.location) || props.location.includes(props.to)) {
    return (
      <Link
        className="list-group-item list-group-item-secondary list-group-item-action active"
        to={props.to}
      >
        {props.label}
      </Link>
    );
  } else {
    return (
      <Link
        className="list-group-item list-group-item-secondary list-group-item-action"
        to={props.to}
      >
        {props.label}
      </Link>
    );
  }
}

const MyTrainingTypesNavLink = withAuthorization(
  props => {
    return (
      <NavLink
        label="My Training Types"
        to="/my-training-types"
        location={props.location}
      />
    );
  },
  [Role.Trainer]
);

class UserNavbar extends Component {

  state = {
    newMessagesCount: 0,
    newTrainingSessions: 0
  }

  componentWillMount() {
    this.getNewMessages();
  }

  getNewTrainingSessiones = () => {

  }

  getNewMessages = () => {
    $.ajax({
      type: "GET",
      url: 'http://localhost:8080/messages/unread',
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      dataType: "json",
      async: true,
      success: result => {
        console.log(result);
        this.setState({
          newMessagesCount: result.count
        })
      },
      error: () => { }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="list-group list-group-horizontal-sm">
          <NavLink
            label="My Training Sessions"
            to="/training-sessions"
            location={this.props.location.pathname}
          />
          <NavLink
            label="My Messages"
            to="/messages"
            location={this.props.location.pathname}
          />
          {/* Without check for user - will revisit authorization */}
          {/* <NavLink label="My Training Types" to="/my-training-types" location={this.props.location.pathname} /> */}
          <MyTrainingTypesNavLink location={this.props.location.pathname} />
          <NavLink
            label="My Account"
            to="/myaccount"
            location={this.props.location.pathname}
          />
          <NavLink
            label="My Calendar"
            to="/myCalendar"
            location={this.props.location.pathname}
          />
          <label class="list-group-item list-group-item-secondary list-group-item-action">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-bell" />
              </button>
              <div class="dropdown-menu">
                <Link class="dropdown-item" to="/messages">
                  {"New Messages: " + this.state.newMessagesCount}
                </Link>
              </div>
            </div>
          </label>
        </div>
      </div>
    );
  }
}

export default withRouter(UserNavbar);
