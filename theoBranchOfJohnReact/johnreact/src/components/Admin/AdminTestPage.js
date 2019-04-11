import React, { Component } from 'react';
import Role from '../Role';
import { Link, withRouter } from "react-router-dom";
import withAuthorization from '../../hoc/withAuthorization';

class AdminTestPage extends Component {

    render() {
        return (
            <React.Fragment>

                <div class="wrapper" style={{ textAlign: "center" }}>
                    <Link class="btn btn-warning" to="/allUsers" style={{ marginTop: "50px" }}>ALL USERS</Link>
                </div>

                {/* <h1>Admin Test Page</h1>
                <h2>Only to test roles authorization</h2>
                <h3>Seems to be working!!</h3> */}
            </React.Fragment>
        );
    }
}

export default withAuthorization(AdminTestPage, [Role.Admin], true);