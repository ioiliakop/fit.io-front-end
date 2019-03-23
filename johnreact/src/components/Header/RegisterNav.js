import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegisterNav extends Component {
    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownRegisterLink" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Register</a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownRegisterLink">
                    {/* semi-working - needs consideration */}
                    <Link className="dropdown-item" to="/register/user"> Register as User</Link>
                    <Link className="dropdown-item" to="/register/trainer"> Register as Trainer</Link>
                </div>
            </li>
        );
    }
}

export default RegisterNav;