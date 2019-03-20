import React, { Component } from 'react'

 class Register extends Component {

  render() {
    // TODO: rolename comes as undefined
    let roleval = this.props.rolename;

    return (
        <div className="container col-8">
        <div className="text-center"><h1 className="mx-auto">Register as {roleval}</h1></div>
        <form action="" method="POST" className="pt-3 pb-2"
            oninput='p2.setCustomValidity(p2.value != password.value ? "Passwords do not match" : "")'>
            <div className="form-group row justify-content-center">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-4">
                    <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com"
                        required/>
                </div>
            </div>
            <div className="form-group row justify-content-center">
                <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-4 ">
                    <input type="password" className="form-control" id="inputPassword" name="password" minlength="8"
                        aria-describedby="passwordHelpBlock" required/>
                    <small id="passwordHelpBlock" className="form-text text-muted">
                        At least 8 characters long
                    </small>
                </div>
            </div>
            <div className="form-group row justify-content-center">
                <label htmlFor="repeatPassword" className="col-sm-3 col-form-label">Repeat Password</label>
                <div className="col-sm-4">
                    <input type="password" className="form-control" id="repeatPassword" name="p2"
                        aria-describedby="password2HelpBlock" required/>
                    <small id="password2HelpBlock" className="form-text text-muted">
                        Passwords must match
                    </small>
                </div>
            </div>
            <div className="form-group row justify-content-center">
                <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="firstName" name="firstName" required/>
                </div>
            </div>
            <div className="form-group row justify-content-center">
                <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="lastName" name="lastName" required/>
                </div>
            </div>
            <div className="form-group row justify-content-center">
                <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                <div className="col-sm-4">
                    <input type="tel" className="form-control" pattern="69{1}[0-9]{8}" id="phone" name="phone"
                        aria-describedby="phoneHelpBlock" required/>
                    <small id="phoneHelpBlock" className="form-text text-muted">
                        10 digits - Format 69XXXXXXXX
                    </small>
                </div>
            </div>
            <div className="form-group row justify-content-center">
                <div className="col-sm-3">
                    <input type="hidden" id="role" name="role" value={roleval}/>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        </form>
    </div>
    );
  }
}

export default Register;