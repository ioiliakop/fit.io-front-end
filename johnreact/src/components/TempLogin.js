import React, { Component } from 'react';

class TempLogin extends Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log('ref to username: ', this.username.current);

        const u = this.username.current.value;
        const p = this.password.current.value;
        console.log('Submitting...', u, p);

        window.$.ajax({
            url: 'http://localhost:8080/e-personal/login',
            dataType: 'json',
            type: 'POST',
            data: {
                username: u,
                password: p
            }
        }).then(json => {
            localStorage.setItem('token', json.token);
        });

        event.preventDefault();
    }

    render() {
        let token = localStorage.getItem('token');
        if (token) {
            // Redirect to UserMain
            return (
                <h4>Welcome back</h4>
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

export default TempLogin;