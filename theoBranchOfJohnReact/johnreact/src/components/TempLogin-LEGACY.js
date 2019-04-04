import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import UserContext from '../context/user-context';

class TempLogin extends Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleLogin = this.handleLogin.bind(this);
        // console.log('Context value on Login constructor', this.context); // not visible here!!!!!!!!!
    }

    static contextType = UserContext;

    componentDidMount() {
        console.log('Context value on Login didMount', this.context); //visible!!
    }

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
            response.json().then(data => {
                console.log('Response status:', response.status);
                console.log(data);
                // Handle login response to localStorage
                if (response.status === 200) {
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
                }
            })
        }).catch(error => console.error('Error:', error));

        event.preventDefault();
    }

    render() {
        // saikoremnants
        // let token = localStorage.getItem('token');
        if (this.context.isLoggedIn) {
            // Redirect to UserMain
            return (
                <Redirect to='/messages' />
            );
        } else {
            return (
                <form onSubmit={this.handleLogin}>
                    <div className="container">
                        <div className="form-group col-sm-4 mx-auto text-center">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" ref={this.username} required />
                        </div>
                        <div className="form-group col-sm-4 mx-auto text-center">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" ref={this.password} required />
                        </div>
                    </div>
                    <div className="container">
                        <button type="submit" className="btn btn-primary btn-block col-sm-4 mx-auto">Login</button>
                    </div>
                </form>
            );
        }
    }

}

export default withRouter(TempLogin);