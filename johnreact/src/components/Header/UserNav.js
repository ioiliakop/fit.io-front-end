import React, { Component } from 'react';
import UserContext from '../../context/user-context';

class UserNav extends Component {

    static contextType = UserContext;

    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarProfileDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    {this.context.userInfo.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarProfileDropdownMenuLink">
                    <a className="dropdown-item" href="#pills-myTrainingSessions">My Training Sessions</a>
                    <a className="dropdown-item" href="#pills-myMessages">My Messages</a>
                    <a className="dropdown-item" href="#pills-myReviews">My Reviews</a>
                    <a className="dropdown-item" href="#pills-myProfile">My Profile</a>
                    <a className="dropdown-item" data-toggle="modal" data-target="#logoutModal"
                        href="#logoutModal">Logout</a>
                </div>
            </li>
        );
    }

}

export default UserNav;