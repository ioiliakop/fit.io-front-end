import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from '../../context/user-context';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../../hoc/Role';

class NotificationsNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfNewTrainingSessions: 0,
            numberOfNewMessages: 0,
            numberOfNewCancelledTrainingSessions: 0,
            visible: false
        }
    }

    render() {
        if (!this.state.visible) return null;
        return(
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle active" id="navbarProfileDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style={{color: 'yellow'}}>
                <FontAwesomeIcon icon="bell" />
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarProfileDropdownMenuLink" style={{Color: 'red'}}>
                <Link className="dropdown-item">New Training Sessions</Link>
                <Link className="dropdown-item">New Messages</Link>
                <Link className="dropdown-item">New Cancelled Trainining Sessions</Link>
            </div>
        </li>
        );
    }
}

export default withAuthorization(NotificationsNav, [Role.User, Role.Trainer]);