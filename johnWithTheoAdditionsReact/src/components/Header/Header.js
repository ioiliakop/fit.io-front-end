import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../../context/user-context';
import LoginNav from './LoginNav';
import RegisterNav from './RegisterNav';
import UserNav from './UserNav';
import LoginModalBody from './LoginModalBody';
import LogoutModalBody from './LogoutModalBody';
import HeaderNavBar from './HeaderNavBar';
import TrainersSearchNav from './TrainersSearchNav';
import AdminNav from './AdminNav';
import NotificationsNav from './NotificationsNav';

/**
 * Our site header
 * All the authentication/authorization checks are handled by the the relative navs/components on export by a HOC
 */
class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <HeaderNavBar>
                    <TrainersSearchNav />
                    <NotificationsNav />
                    <AdminNav />
                    <UserNav />
                    <LoginNav />
                    <RegisterNav />
                </HeaderNavBar>

                <LogoutModalBody />
                <LoginModalBody />
            </React.Fragment>
        );
    }
}

export default withRouter(Header);
