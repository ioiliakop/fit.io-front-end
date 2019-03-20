import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <nav class="navbar navbar-expand-sm bg-primary navbar-dark sticky-top py-4">
                    <div class="container">
                        <a class="navbar-brand" href="/"><i class="fas fa-running"></i> <strong>fit.io</strong></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="modal" data-target="#loginModal" href="#loginModal">Login</a>
                                </li>

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownRegisterLink" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Register
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownRegisterLink">
                                        {/* not working properly yet - needs investigation :P*/}
                                        <Link className="dropdown-item" to="/register/user"> Register as User</Link>
                                        <Link className="dropdown-item" to="/register/trainer"> Register as Trainer</Link>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Contact</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="navbarDropdownLanguageLink" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        Language
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownLanguageLink">
                                        <a class="dropdown-item" href="#">English</a>
                                        <a class="dropdown-item" href="#">Greek</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="modal fade" id="loginModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="loginModalLabel">Login</h5>
                                <button class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form action="" method="POST">
                                <div class="modal-body">
                                    <div class="form-group col-sm-7 mx-auto text-center">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" class="form-control" name="username" required />
                                    </div>
                                    <div class="form-group col-sm-7 mx-auto text-center">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" class="form-control" name="password" required />
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-center">
                                    <button type="submit" class="btn btn-primary btn-block col-sm-4">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


const linkStyle = {
    color: '#fff',
    textDecoration: "none"
}

const headerStyle = {
    background: "red",
    color: "white",
    textAlign: "center"
}

export default withRouter(Header);
