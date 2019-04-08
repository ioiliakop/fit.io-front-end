import React, { Component } from 'react';

class LanguageNav extends Component {
    render() {
        return (
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdownLanguageLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Language
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownLanguageLink">
                <a className="dropdown-item" href="/">English</a>
                <a className="dropdown-item" href="/">Greek</a>
            </div>
        </li>
        );
    }
}

export default LanguageNav;