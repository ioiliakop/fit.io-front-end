import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

// decides whether item is active or not
function NavLink(props) {
    if (props.location === "/") return <Link className="list-group-item list-group-item-secondary list-group-item-action" to={props.to}>{props.label}</Link>
    if (props.to.includes(props.location) || props.location.includes(props.to)) {
        return <Link className="list-group-item list-group-item-secondary list-group-item-action active" to={props.to}>{props.label}</Link>
    }
    else {
        return <Link className="list-group-item list-group-item-secondary list-group-item-action" to={props.to}>{props.label}</Link>
    }
}

// We set appropriate authorization for TrainingTypesNavLink
const MyTrainingTypesNavLink = withAuthorization(((props) => {
    return (
        <NavLink label="My Training Types" to="/my-training-types" location={props.location} />
    )
}),[Role.Trainer]);

class UserNavbar extends Component {
    render() {
        return (
            <div className="container">
                <div className="list-group list-group-horizontal-sm">
                    <NavLink label="My Training Sessions" to="/training-sessions" location={this.props.location.pathname} />
                    <NavLink label="My Messages" to="/messages" location={this.props.location.pathname} />
                    {/* Without check for user - will revisit authorization */}
                    {/* <NavLink label="My Training Types" to="/my-training-types" location={this.props.location.pathname} /> */}
                    <MyTrainingTypesNavLink location={this.props.location.pathname} />
                    <NavLink label="My Account" to="/myaccount" location={this.props.location.pathname} />
                </div>
            </div>
        );
    }
}

export default withRouter(UserNavbar);