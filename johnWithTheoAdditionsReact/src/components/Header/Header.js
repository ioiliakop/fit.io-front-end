import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../../context/user-context';
import LoginNav from './LoginNav';
import RegisterNav from './RegisterNav';
import UserNav from './UserNav';
import LoginModalBody from './LoginModalBody';
import LogoutModalBody from './LogoutModalBody';
import ContactNav from './ContactNav';
import LanguageNav from './LanguageNav';
import HeaderNavBar from './HeaderNavBar';
import TrainersSearchNav from './TrainersSearchNav';
import AdminNav from './AdminNav';
import NotificationsNav from './NotificationsNav';

class Header extends Component {

    static contextType = UserContext;

    render() {
        return (
            <React.Fragment>
                {console.log('Context value in Header render():', this.context)}

                <HeaderNavBar>
                    <TrainersSearchNav />
                    {/* {this.context.isLoggedIn ? <UserNav /> : <React.Fragment><LoginNav /><RegisterNav /></React.Fragment>} */}
                    <NotificationsNav />
                    <AdminNav />
                    <UserNav />
                    <LoginNav />
                    <RegisterNav />
                    <ContactNav />
                    <LanguageNav />
                </HeaderNavBar>

                {/* LOGIN OR LOGOUT Modal Body needed for corresponding navs above depending on context */}
                {/* {this.context.isLoggedIn ? <LogoutModalBody /> : <LoginModalBody />} */}
                <LogoutModalBody />
                <LoginModalBody />
            </React.Fragment>
        );
    }
}

export default withRouter(Header);
