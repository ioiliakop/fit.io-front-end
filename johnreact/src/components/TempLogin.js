import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class TempLogin extends Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

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
                    console.log('Saving userInfo to localstorage', data.user);
                    localStorage.setItem('token', data.alphanumeric);
                    localStorage.setItem('userInfo', JSON.stringify(data.user));
                }
            })
        }).catch(error => console.error('Error:', error));

        event.preventDefault();
    }

    render() {
        // saikoremnants
        let token = localStorage.getItem('token');
        if (token) {
            // Redirect to UserMain
            return (
                <Redirect to='/messages' />
            );
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
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