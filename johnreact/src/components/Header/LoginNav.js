import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginNav extends Component {
    render() {
        return (
            <li className="nav-item">
                <a className="nav-link" data-toggle="modal" data-target="#loginModal" href="#loginModal">Login</a>
            </li>
        );
    }
}

export default LoginNav;