import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from '../../context/user-context';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../../hoc/Role';
import $ from 'jquery';
import CanceledSessionsModal from '../Notifications/CanceledSessionsModal';
import NewTraininSessionsModal from '../Notifications/NewTraininSessionsModal';

class NotificationsNav extends Component {

    static contextType = UserContext;

    state = {
        newMessagesCount: 0,
        newTrainingSessions: [],
        cancelledSessions: [],
        visible: false
    }

    componentDidMount() {
        this.getNewMessages();
        if (this.context.userInfo.role.id == 2) {
            this.getNewTrainingSessions(this.context.userInfo);
        }
        this.getCancelledSessions(this.context.userInfo);
        console.log('inside notificationsnav componentdidmount. Current state:', this.state);
        // this.checkNewNotificationsExist();
    }

    // sets visible flag in state accordingly
    // if there are no notifications, the notifications nav will be hidden
    // is called as callback after each setState that affects messages, newTrainingSessions and newCancelledSeddions
    checkNewNotificationsExist = () => {
        if (this.state.newMessagesCount === 0 && this.state.newTrainingSessions.length < 1 && this.state.cancelledSessions.length < 1) {
            this.setState({ visible: false });
        } else this.setState({ visible: true });
    }

    getNewTrainingSessions = () => {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/session/notify-booked-sessions/${this.context.userInfo.id}`,
            headers: { "X-MSG-AUTH": this.context.token },
            dataType: "json",
            async: true,
            success: newTrainingSessions => {
                this.setState({
                    newTrainingSessions
                }, () => this.checkNewNotificationsExist());
            },
            error: () => { }
        });
    }

    getCancelledSessions = () => {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/session/notify-canceled-sessions/${this.context.userInfo.id}`,
            headers: { "X-MSG-AUTH": this.context.token },
            dataType: "json",
            async: true,
            success: cancelledSessions => {
                this.setState({
                    cancelledSessions
                }, () => this.checkNewNotificationsExist());
            },
            error: () => { }
        });
    }

    getNewMessages = () => {
        $.ajax({
            type: "GET",
            url: 'http://localhost:8080/messages/unread',
            headers: { "X-MSG-AUTH": this.context.token },
            dataType: "json",
            async: true,
            success: result => {
                console.log(result);
                this.setState({
                    newMessagesCount: result.count
                }, () => this.checkNewNotificationsExist());
            },
            error: () => { }
        });
    }

    setMessagesSeen = () => {
        $.ajax({
            type: "POST",
            url: `http://localhost:8080/messages/setAllMessagesRead`,
            headers: { "X-MSG-AUTH": this.context.token },
            async: true,
            success: () => {
                this.setState({
                    newMessagesCount: 0
                }, () => this.checkNewNotificationsExist());
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
            headers: { "X-MSG-AUTH": this.context.token },
            async: true,
            success: () => {
                this.setState({
                    newTrainingSessions: [...this.state.newTrainingSessions.filter(newSession => newSession.id != session.id)]
                }, () => this.checkNewNotificationsExist());
            },
            error: () => { }
        });
        $("#newSessionsModal").modal("hide");
    }

    setCanceledSessionThatIsSeenByTrainer = (session) => {
        $.ajax({
            type: "POST",
            url: `http://localhost:8080/session/set-canceled-sessions-read/${session.id}`,
            headers: { "X-MSG-AUTH": this.context.token },
            async: true,
            success: () => {
                this.setState({
                    cancelledSessions: [...this.state.cancelledSessions.filter(canceledSession => canceledSession.id != session.id)]
                }, () => this.checkNewNotificationsExist());
            },
            error: () => { }
        });
        $("#cancelSessionModal").modal("hide");
    }

    render() {
        if (!this.state.visible) return null;
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" id="navbarProfileDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" style={{ color: 'yellow' }}>
                    <FontAwesomeIcon icon="bell" />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarProfileDropdownMenuLink" style={{ Color: 'red' }}>
                    {/* <Link className="dropdown-item">New Training Sessions</Link>
                    <Link className="dropdown-item">New Messages</Link>
                    <Link className="dropdown-item">New Cancelled Trainining Sessions</Link> */}
                    <Link onClick={this.setMessagesSeen.bind(this)} class="dropdown-item" to="/messages">
                        {"New Messages: " + this.state.newMessagesCount}
                    </Link>

                    {this.context.userInfo.role.name === Role.Trainer ? (
                        <button class="dropdown-item" onClick={this.showNewSessionsModal} >
                            {"New TrainingSessions: " + this.state.newTrainingSessions.length}
                        </button>
                    ) : null}

                    <button class="dropdown-item" onClick={this.showCancelledSessionsModal} >
                        {"Latest Cancelled Sessions: " + this.state.cancelledSessions.length}
                    </button>

                    <CanceledSessionsModal newTrainingSessions={this.state.cancelledSessions} setCanceledSessionThatIsSeenByTrainer={this.setCanceledSessionThatIsSeenByTrainer}></CanceledSessionsModal>
                    <NewTraininSessionsModal newTrainingSessions={this.state.newTrainingSessions} removeSessionFromNew={this.removeSessionFromNew}></NewTraininSessionsModal>
                </div>
            </li>
        );
    }
}

export default withAuthorization(NotificationsNav, [Role.User, Role.Trainer]);