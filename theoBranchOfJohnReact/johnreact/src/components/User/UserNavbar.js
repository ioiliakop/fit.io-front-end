import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import NewTraininSessionsModal from "./NewTraininSessionsModal";
import withAuthorization from "../../hoc/withAuthorization";
import CanceledSessionsModal from "./CanceledSessionsModal";
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
    user: {},
    newMessagesCount: 0,
    newTrainingSessions: [],
    cancelledSessions: []
  }



  componentWillMount() {
    if (localStorage.getItem("userInfo") !== "") {
      this.getNewMessages();
      let user = JSON.parse(localStorage.getItem("userInfo"));
      this.setState({
        user
      })
      if (user.role.id == 2) {
        this.getNewTrainingSessions(user);
      }
      this.getCancelledSessions(user);
    }
  }

  getNewTrainingSessions = (user) => {
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/session/notify-booked-sessions/${user.id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      dataType: "json",
      async: true,
      success: newTrainingSessions => {
        this.setState({
          newTrainingSessions
        });
      },
      error: () => { }
    });
  }

  getCancelledSessions = (user) => {
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/session/notify-canceled-sessions/${user.id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      dataType: "json",
      async: true,
      success: cancelledSessions => {
        this.setState({
          cancelledSessions
        });
      },
      error: () => { }
    });
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

  setMessagesSeen = () => {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    $.ajax({
      type: "POST",
      url: `http://localhost:8080/messages/setAllMessagesRead`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      async: true,
      success: () => {
        this.setState({
          newMessagesCount: 0
        })
      },
      error: () => { }
    });
  }

  showNewSessionsModal = () => {
    $("#newSessionsModal").modal("show");
  }
  showCancelledSessionsModal = () => {
    $("#cancelSessionModal").modal("show");
  }


  removeSessionFromNew = (session) => {
    $.ajax({
      type: "POST",
      url: `http://localhost:8080/session/notified/${session.id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      async: true,
      success: () => {
        this.setState({
          newTrainingSessions: [...this.state.newTrainingSessions.filter(newSession => newSession.id != session.id)]
        });
      },
      error: () => { }
    });
    $("#newSessionsModal").modal("hide");
  }

  setCanceledSessionThatIsSeenByTrainer = (session) => {
    $.ajax({
      type: "POST",
      url: `http://localhost:8080/session/set-canceled-sessions-read/${session.id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      async: true,
      success: () => {
        this.setState({
          cancelledSessions: [...this.state.cancelledSessions.filter(canceledSession => canceledSession.id != session.id)]
        });
      },
      error: () => { }
    });
    $("#cancelSessionModal").modal("hide");
  }


  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="list-group list-group-horizontal-sm">
            <NavLink label="My Training Sessions" to="/training-sessions" location={this.props.location.pathname} />
            <NavLink label="My Messages" to="/messages" location={this.props.location.pathname} />
            {/* Without check for user - will revisit authorization */}
            {/* <NavLink label="My Training Types" to="/my-training-types" location={this.props.location.pathname} /> */}
            <MyTrainingTypesNavLink location={this.props.location.pathname} />
            <NavLink label="My Account" to="/myaccount" location={this.props.location.pathname}
            />
            <NavLink label="My Calendar" to="/myCalendar" location={this.props.location.pathname} />
            <label class="list-group-item list-group-item-secondary list-group-item-action">
              <div class="btn-group">
                <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                  <i class="fas fa-bell" />
                </button>
                <div class="dropdown-menu">
                  <Link onClick={this.setMessagesSeen.bind(this)} class="dropdown-item" to="/messages">
                    {"New Messages: " + this.state.newMessagesCount}
                  </Link>

                  {this.state.user.role.id == 2 ? (
                    <button class="dropdown-item" onClick={this.showNewSessionsModal} >
                      {"New TrainingSessions: " + this.state.newTrainingSessions.length}
                    </button>
                  ) : null}

                  <button class="dropdown-item" onClick={this.showCancelledSessionsModal} >
                    {"Latest Cancelled Sessions: " + this.state.cancelledSessions.length}
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>

        <CanceledSessionsModal newTrainingSessions={this.state.cancelledSessions} setCanceledSessionThatIsSeenByTrainer={this.setCanceledSessionThatIsSeenByTrainer}> </CanceledSessionsModal>
        <NewTraininSessionsModal newTrainingSessions={this.state.newTrainingSessions} removeSessionFromNew={this.removeSessionFromNew}></NewTraininSessionsModal>
      </React.Fragment>
    );
  }
}

export default withRouter(UserNavbar);
