import React, { Component } from "react";
import "../../stylesheets/profile.css";
import { Link, withRouter } from "react-router-dom";
import SendMessageModal from "./SendMessageModal";
import $ from "jquery";
class TrainerProfile extends Component {
  state = {
    loggedInUser: {},
    user: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log("too id einaiaaa " + id);
    if (localStorage.getItem("userInfo") != "") {
      this.setState({
        loggedInUser: JSON.parse(localStorage.getItem("userInfo"))
      });
      $.ajax({
        type: "GET",
        url: `http://localhost:8080/find/getUser/${id}`,
        dataType: "json",
        async: true,
        success: user => {
          this.setState({
            user
          });
        },
        error: error => {
          alert("error");
          // this.props.history.push("/");
        }
      });
    } else {
      this.props.history.push("/login");
    }
  }

  generateProfilePic = () => {
    if (this.state.user.photoLink == "" || this.state.user.photoLink == null) {
      return (<img class="editable img-responsive" alt=" Avatar" id="avatar2" src="https://www.chiosstartup.com/1.jpg" style={{ width: "200px" }} />)
    } else {
      return (<img class="editable img-responsive" alt=" Avatar" id="avatar2" src={this.state.user.photoLink} style={{ width: "200px" }} />)
    }
  }
  render() {
    const { user, loggedInUser } = this.state;
    return (
      <React.Fragment>
        <div id="user-profile-2" class="user-profile">
          <div class="tabbable">
            <div class="tab-content no-border padding-24">
              <div id="home" class="tab-pane in active">
                <div class="row">
                  <div class="col-xs-12 col-sm-3 center">
                    <span class="profile-picture">
                      {this.generateProfilePic()}
                    </span>

                    <div class="space space-4" />

                    <a href="#" class="btn btn-sm btn-block btn-success">
                      {/* <i class="fas fa-paper-plane" /> */}
                      <button type="button" class="btn btn-success"
                        data-toggle="modal"
                        data-target="#sendPersonalMessageModal">
                        <i class="fas fa-paper-plane">Send Message</i>
                      </button>
                      {/* <span class="bigger-110">Send Message</span> */}
                    </a>
                  </div>

                  <div class="col-xs-12 col-sm-9">
                    <h4 class="blue">
                      <span class="middle">
                        {user.firstName + " " + user.lastName}
                      </span>
                    </h4>

                    <div class="profile-user-info">
                      <div class="profile-info-row">
                        <div class="profile-info-name">Username</div>

                        <div class="profile-info-value">
                          <span>{user.username}</span>
                        </div>
                      </div>
                    </div>

                    <div class="hr hr-8 dotted" />

                    <div class="profile-user-info">
                      <div class="profile-info-row">
                        <div class="profile-info-name">Email</div>

                        <div class="profile-info-value">
                          <a href="#" target="_blank">
                            {user.email}
                          </a>
                        </div>
                      </div>

                      <div class="profile-info-row">
                        <div class="profile-info-name">
                          <i class="fas fa-calendar-alt"></i>
                        </div>

                        <div class="profile-info-value">
                          <Link to={`/trainersCalendar/${user.id}`}>
                            Available Dates
                          </Link>
                        </div>
                      </div>

                      <div class="profile-info-row">
                        <div class="profile-info-name">
                          <i class="fas fa-star-half"></i>
                        </div>

                        <div class="profile-info-value">
                          <Link to={`/reviews/${user.id}`}>Reviews</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-20" />
              </div>
            </div>
          </div>
        </div>

        <SendMessageModal sender={loggedInUser} receiver={user} />
      </React.Fragment>
    );
  }
}

export default withRouter(TrainerProfile);
