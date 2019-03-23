import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../context/user-context';
import LoginNav from './Header/LoginNav';
import RegisterNav from './Header/RegisterNav';
import UserNav from './Header/UserNav';

class Header extends Component {

    static contextType = UserContext;

    handleLogout() {
        const url = 'http://localhost:8080/login/logout';

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log('Response status:', response.status);
            // Handle logout action to localStorage
            if (response.status === 200) {
                console.log('Wiping local storage...');
                localStorage.clear();
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <React.Fragment>

                {console.log(this.context)}

                <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top py-4">
                    <div className="container">
                        <a className="navbar-brand" href="/"><i className="fas fa-running"></i> <strong>fit.io</strong></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                            <ul className="navbar-nav">

                                {this.context.isLoggedIn ? <UserNav /> : <React.Fragment><LoginNav /><RegisterNav /></React.Fragment>}

                                <li className="nav-item">
                                    <a className="nav-link" href="/">Contact</a>
                                </li>
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
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* LOGIN MODAL BODY */}
                <div className="modal fade" id="loginModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form action="" method="POST">
                                <div className="modal-body">
                                    <div className="form-group col-sm-7 mx-auto text-center">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" name="username" required />
                                    </div>
                                    <div className="form-group col-sm-7 mx-auto text-center">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" required />
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button type="submit" className="btn btn-primary btn-block col-sm-4">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* LOGOUT MODAL BODY */}
                <div className="modal fade" id="logoutModal">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="logoutModalLabel">Logout</h5>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="text-center">
                                    Are you sure you want to logout?
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-danger btn-block col-sm-4" data-dismiss="modal" onClick={this.handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


// const linkStyle = {
//     color: '#fff',
//     textDecoration: "none"
// }

// const headerStyle = {
//     background: "red",
//     color: "white",
//     textAlign: "center"
// }

export default withRouter(Header);
