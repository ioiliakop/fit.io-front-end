import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user-context';

class UserNav extends Component {

    static contextType = UserContext;

    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" id="navbarProfileDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.context.userInfo.username}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarProfileDropdownMenuLink">

                    {this.context.userInfo.role.id == 3 ?
                        (<React.Fragment>
                            <Link className="dropdown-item" to="/admin">Admin Page</Link>
                            <Link className="dropdown-item" to="/messages">Messages</Link>
                        </React.Fragment>)
                        :
                        (<React.Fragment>
                            <Link className="dropdown-item" to="/training-sessions">My Training Sessions</Link>
                            <Link className="dropdown-item" to="/messages">My Messages</Link>
                            <Link className="dropdown-item" to="/myaccount">My Account</Link>
                        </React.Fragment>)
                    }

                    <a className="dropdown-item" data-toggle="modal" data-target="#logoutModal" href="#logoutModal">Logout</a>
                </div>
            </li>
        );
    }

}

export default UserNav;