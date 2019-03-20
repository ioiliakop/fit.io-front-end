import React, { Component } from 'react'

 class Register extends Component {
  render() {
    return (
        <div class="container col-8">
        <form action="" method="POST" class="pt-3 pb-2"
            oninput='p2.setCustomValidity(p2.value != password.value ? "Passwords do not match" : "")'>
            <div class="form-group row justify-content-center">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-4">
                    <input type="email" class="form-control" id="email" name="email" placeholder="email@example.com"
                        required/>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
                <div class="col-sm-4 ">
                    <input type="password" class="form-control" id="inputPassword" name="password" minlength="8"
                        aria-describedby="passwordHelpBlock" required/>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        At least 8 characters long
                    </small>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <label for="repeatPassword" class="col-sm-3 col-form-label">Repeat Password</label>
                <div class="col-sm-4">
                    <input type="password" class="form-control" id="repeatPassword" name="p2"
                        aria-describedby="password2HelpBlock" required/>
                    <small id="password2HelpBlock" class="form-text text-muted">
                        Passwords must match
                    </small>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <label for="firstName" class="col-sm-3 col-form-label">First Name</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="firstName" name="firstName" required/>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <label for="lastName" class="col-sm-3 col-form-label">Last Name</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="lastName" name="lastName" required/>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <label for="phone" class="col-sm-3 col-form-label">Phone</label>
                <div class="col-sm-4">
                    <input type="tel" class="form-control" pattern="69{1}[0-9]{8}" id="phone" name="phone"
                        aria-describedby="phoneHelpBlock" required/>
                    <small id="phoneHelpBlock" class="form-text text-muted">
                        10 digits - Format 69XXXXXXXX
                    </small>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <div class="col-sm-3">
                    <input type="hidden" id="role" name="role" value=""/>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        </form>
    </div>
    );
  }
}

export default Register
