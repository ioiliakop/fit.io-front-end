import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import ButtonLink from './Utils/ButtonLink';
import Role from './Role';
import withAuthorization from '../hoc/withAuthorization';

// decides whether item is active or not
// function ButtonLink(props) {
//     if (props.to === props.location) {
//         return <Link className="btn btn-outline-primary btn-lg active" role="button" to={props.to}>{props.label}</Link>
//     }
//     else {
//         return <Link className="btn btn-outline-primary btn-lg" role="button" to={props.to}>{props.label}</Link>
//     }
// }

// TODO: Password repeat validation, check if email AND username already exists
class Register extends Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            roleId: ((this.props.match.params.rolename === 'trainer') ? 2 : 1),
            regSuccess: false
        }
        console.log('RoleId in register constructor:', this.state.roleId);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Previous roleId:', prevState.roleId);
        // We MUST make this check, otherwise the component will never stop updating (Infinite loop)
        if (prevState.roleId !== ((this.props.match.params.rolename === 'trainer') ? 2 : 1)) {
            this.setState({ roleId: ((prevState.roleId === 2) ? 1 : 2) });
        }
        console.log('roleId after component did update:', this.state.roleId);
    }

    // Used to redirect after registration | either this or history.props.push
    renderRedirect() {
        return null;
        if (this.state.regSuccess) {
            return <Redirect to='/' />
        }
    }

    handleSubmit(event) {
        // const ph = this.phone.current.value;

        const url = 'http://localhost:8080/register/save';
        const formData = {
            "username": this.username.current.value,
            "password": this.password.current.value,
            "email": this.email.current.value,
            "firstName": this.firstName.current.value,
            "lastName": this.lastName.current.value,
            "role": {
                "id": this.state.roleId
            }
        };

        console.log('Submitting...', formData);

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(formData), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log('Sent. Response status:', response.status);
            this.props.history.push('/');
            // this.setState({ regSuccess: true });
            // Redirect somewhere with success message alert or whatever
        }).catch(error => console.error('Error:', error));

        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                {this.renderRedirect()}  {/* Redirects to landing page if registration was successfull. Maybe will be expanded for other cases Alternative way with history.push*/}
                <nav className="navbar navbar-light navbar-expand-md">
                    <div className="container col-sm pt-4 pb-2">
                        <ul className="navbar-nav mx-auto">
                            <li>
                                {/* <button className="btn btn-outline-primary" type="button">Register as User</button> */}
                                <ButtonLink label="Register as User" to="/register/user" location={this.props.location.pathname} />
                            </li>
                            <li>
                                <span className="col-1"> </span>
                            </li>
                            <li>
                                {/* <button className="btn btn-outline-primary" type="button">Register as Trainer</button> */}
                                <ButtonLink label="Register as Trainer" to="/register/trainer" location={this.props.location.pathname} />
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container col-8">
                    <div className="text-center"><h1 className="mx-auto">Register as {this.props.match.params.rolename}</h1></div>
                    <form onSubmit={this.handleSubmit} className="pt-3 pb-2">
                        {/* onInput='p2.setCustomValidity(p2.value != password.value ? "Passwords do not match" : "")' */}
                        <div className="form-group row justify-content-center">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-4">
                                <input type="email" className="form-control" id="email" name="email" placeholder="email@mail.com"
                                    required ref={this.email} />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Username</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="username" name="username" required ref={this.username} />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-4 ">
                                <input type="password" className="form-control" id="inputPassword" name="password" minLength="8"
                                    aria-describedby="passwordHelpBlock" required ref={this.password} />
                                <small id="passwordHelpBlock" className="form-text text-muted">
                                    At least 8 characters long
                            </small>
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="repeatPassword" className="col-sm-3 col-form-label">Repeat Password</label>
                            <div className="col-sm-4">
                                <input type="password" className="form-control" id="repeatPassword" name="p2"
                                    aria-describedby="password2HelpBlock" required />
                                <small id="password2HelpBlock" className="form-text text-muted">
                                    Passwords must match
                    </small>
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="firstName" name="firstName" required ref={this.firstName} />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="lastName" name="lastName" required ref={this.lastName} />
                            </div>
                        </div>
                        {/* <div className="form-group row justify-content-center">
                        <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-4">
                            <input type="tel" className="form-control" pattern="69{1}[0-9]{8}" id="phone" name="phone"
                                aria-describedby="phoneHelpBlock" required ref={this.phone} />
                            <small id="phoneHelpBlock" className="form-text text-muted">
                                10 digits - Format 69XXXXXXXX
                            </small>
                        </div>
                    </div> */}
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-3">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

// worked with history.push
// export default withRouter(Register);

// with authorization alternative
export default withAuthorization(Register, [Role.Guest], true);