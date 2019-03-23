import React, { Component } from 'react';

class LogoutModalBody extends Component {
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
                            <button className="btn btn-danger btn-block col-sm-4" data-dismiss="modal" onClick={this.props.handle}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogoutModalBody;