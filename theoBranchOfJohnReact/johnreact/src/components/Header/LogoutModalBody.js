import React, { Component } from 'react';
import UserContext from '../../context/user-context'

class LogoutModalBody extends Component {

    static contextType = UserContext;
    

    handleLogout = () => {
        const url = 'http://localhost:8080/login/logout';

        // We sand ajax call to backend
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
                this.context.updateUserContext();
            }
        }).catch(error => console.error('Error:', error));
    }
    
    render() {
        return (
            <div className="modal fade" id="logoutModal">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="logoutModalLabel">Logout</h5>
                            <button className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                Are you sure you want to logout?
                        </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button className="btn btn-danger btn-block col-sm-4" data-dismiss="modal" onClick={this.handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogoutModalBody;