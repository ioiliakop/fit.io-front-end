import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import UserContext from '../context/user-context';
import LoginNav from './Header/LoginNav';
import RegisterNav from './Header/RegisterNav';
import UserNav from './Header/UserNav';
import LoginModalBody from './Header/LoginModalBody';
import LogoutModalBody from './Header/LogoutModalBody';
import ContactNav from './Header/ContactNav';
import LanguageNav from './Header/LanguageNav';
import HeaderNavBar from './Header/HeaderNavBar';

class Header extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     loggedOut: false
        // };
        this.handleLogout = this.handleLogout.bind(this);
        this.loggedOut = false;
    }

    static contextType = UserContext;

    handleLogout = () => {
        const url = 'http://localhost:8080/login/logout';

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
            }
        }).then(response => {
            console.log('Response status:', response.status);
            // Handle logout action to localStorage
            if (response.status === 200) {
                console.log('Wiping local storage...');
                localStorage.clear();
                this.loggedOut = true;
                // this.props.history.push("/");
            }
        }).catch(error => console.error('Error:', error));
    }

    // Redirect not working properly
    renderRedirect() {
        if (this.loggedOut) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <React.Fragment>
                {console.log('Context value in Header render():', this.context)}
                {/* {this.renderRedirect()} */}

                <HeaderNavBar>
                    {this.context.isLoggedIn ? <UserNav /> : <React.Fragment><LoginNav /><RegisterNav /></React.Fragment>}
                    <ContactNav />
                    <LanguageNav />
                </HeaderNavBar>

                {/* LOGIN OR LOGOUT Modal Body needed for corresponding navs above depending on context */}
                {this.context.isLoggedIn ? <LogoutModalBody handle={this.handleLogout} /> : <LoginModalBody />}
            </React.Fragment>
        );
    }
}


// const linkStyle = {
//     color: '#fff',
//     textDecoration: "none"
// }

// const headerStyle = {
//     background: "red",
//     color: "white",
//     textAlign: "center"
// }

export default withRouter(Header);
