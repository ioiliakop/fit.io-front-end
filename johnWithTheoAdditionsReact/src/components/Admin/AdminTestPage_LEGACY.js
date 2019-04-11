import React, { Component } from 'react';
import Role from '../../hoc/Role';
import withAuthorization from '../../hoc/withAuthorization';

class AdminTestPage extends Component {
    render() {
        return(
            <React.Fragment>
            <h1>Admin Test Page</h1>
            <h2>Only to test roles authorization</h2>
            <h3>Seems to be working!!</h3>
            </React.Fragment>
        );
    }
}

export default withAuthorization(AdminTestPage, [Role.Admin], true);