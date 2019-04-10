import React, { Component } from 'react';
import UserContext from '../../context/user-context';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

class LoginModalBody extends Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleLogin = this.handleLogin.bind(this);
    }

    static contextType = UserContext;

    handleLogin(event) {
        console.log('Context value in handleLogin()', this.context); //visible!!

        const url = 'http://localhost:8080/login/user';
        const loginData = {
            "username": this.username.current.value,
            "password": this.password.current.value
        }

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(loginData), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log('Login Response status:', response.status);
            console.log('Login Response', response);
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    // Handle login response to localStorage
                    console.log('Saving token to localstorage', data.alphanumeric);
                    localStorage.setItem('token', data.alphanumeric);
                    console.log('Saving userInfo to localstorage', data.user);
                    localStorage.setItem('userInfo', JSON.stringify(data.user));
                    // this.props.history.push('/');
                    // Attempt to change user context after login
                    console.log('Context before change:', this.context)
                    // appContext.setUserContext({
                    //     isLoggedIn: true,
                    //     token: data.alphanumeric,
                    //     userInfo: data.user
                    // });
                    this.context.updateUserContext();
                    console.log('Changed context after login. New context', this.context);
                })
            }
        }).catch(error => console.error('Error:', error));

        event.preventDefault();
    }

    render() {
        return (
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
                                    <input type="text" className="form-control" name="username" ref={this.username} required />
                                </div>
                                <div className="form-group col-sm-7 mx-auto text-center">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" ref={this.password} required />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="submit" className="btn btn-primary btn-block col-sm-4" data-dismiss="modal" onClick={this.handleLogin}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuthorization(LoginModalBody, [Role.Guest]);