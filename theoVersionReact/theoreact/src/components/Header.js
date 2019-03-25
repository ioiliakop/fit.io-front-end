import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const loginData = {
      username: this.username.current.value,
      password: this.password.current.value
    };

    window.$.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/login/user",
      data: JSON.stringify(loginData),
      dataType: "json",
      success: token => {
        console.log(token);
      },
      error: () => {
        console.log("error");
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top py-4">
          <div className="container">
            <a className="navbar-brand" href="/">
              <i className="fas fa-running" /> <strong>fit.io</strong>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="collapsibleNavbar"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="modal"
                    data-target="#loginModal"
                    href="#loginModal"
                  >
                    Login
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownRegisterLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Register
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownRegisterLink"
                  >
                    {/* working - needs consideration */}
                    <Link className="dropdown-item" to="/register/user">
                      {" "}
                      Register as User
                    </Link>
                    <Link className="dropdown-item" to="/register/trainer">
                      {" "}
                      Register as Trainer
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownLanguageLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Language
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownLanguageLink"
                  >
                    <a className="dropdown-item" href="#">
                      English
                    </a>
                    <a className="dropdown-item" href="#">
                      Greek
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="modal fade" id="loginModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">
                  Login
                </h5>
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="container">
                  <div className="form-group col-sm-7 mx-auto text-center">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      ref={this.username}
                      required
                    />
                  </div>
                  <div className="form-group col-sm-7 mx-auto text-center">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      ref={this.password}
                      required
                    />
                  </div>
                </div>
                <div className="container">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block col-sm-4 mx-auto"
                  >
                    Login
                  </button>
                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

const headerStyle = {
  background: "red",
  color: "white",
  textAlign: "center"
};

export default withRouter(Header);
