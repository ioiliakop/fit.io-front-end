import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../context/user-context';
import Role from '../components/Role';

// Still considering
// Sometimes I want to return null, othertimes redirect to main
// Maybe create two HOC one for route components and one for the rest
// e.g. withAuthorizationOrNull - withAuthorizationOrRedirect
// function withAuthorizationOrRedirect(props) {
//     return (
//         <withAuthorization redirect={true} {...props} />
//     );
// }

/**
 * This HOC is responsible for implementing authorization throughout our app components
 * 'roles' parameter is an array containing only roles that should have access to the WrappedComponent
 * Values of the 'Role' "enum-like" should be used for passing values to roles, to avoid mistakes/better handling
 * If the user's role is not included in the given roles array, redirect to "/"
 * 
 * Testing with 3rd parameter 'redirect' to indicate whether to return redirect to "/" or return null
 * 
 * @param {Component} WrappedComponent 
 * @param {Array} roles 
 */
function withAuthorization(WrappedComponent, roles, redirect) {
    return class extends Component {

        static contextType = UserContext;

        render() {

            console.log('Inside withAuthorization render method');
            console.log('Roles given:', roles);
            // this.context.userInfo.role.name && console.log('User role:', this.context.userInfo.role.name);

            // User not logged in
            if (!this.context.isLoggedIn) {
                // component explicitly allowing access to logged out users only (e.g. Login/Register)
                if (roles && roles.includes(Role.Guest)) return <WrappedComponent {...this.props} />
                else {
                    if (redirect === true) {
                        console.log('Redirect to main triggerred from withAuthorization');
                        return <Redirect to="/" />;
                    } else return null;
                }
            }

            // User unauthorized for this component
            if (!(roles && roles.includes(this.context.userInfo.role.name))) {
                // console.log('Redirect to main triggerred from withAuthorization');
                // return <Redirect to="/" />
                // return null;
                if (redirect === true) {
                    console.log('Redirect to main triggerred from withAuthorization');
                    return <Redirect to="/" />
                }
                else return null;
            }

            // user authorized
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withAuthorization;