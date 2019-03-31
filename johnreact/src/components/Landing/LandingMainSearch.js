import React, { Component } from 'react';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

// Only testing atm
// Still making considerations regarding withAuthorization
class LandingMainSearch extends Component {
    render() {
        return (
            <form className="form-inline row justify-content-between">
                <input type="text" id="username" className="form-control form-control-lg mr-0 col-sm-5" placeholder="Choose area" />
                <input type="text" id="password" className="form-control form-control-lg mr-0 col-sm-5" placeholder="Or choose workout style" />
                <button className="btn btn-primary btn-lg col-sm-2" type="submit">Search</button>
            </form>
        );
    }

}

export default withAuthorization(LandingMainSearch, [Role.Trainer, Role.User]);