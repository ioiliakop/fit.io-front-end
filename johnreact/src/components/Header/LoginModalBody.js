import React, { Component } from 'react';

class LoginModalBody extends Component {
    render() {
        return (
            <div className="modal fade" id="loginModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Login</h5>
                            <button className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form action="" method="POST">
                            <div className="modal-body">
                                <div className="form-group col-sm-7 mx-auto text-center">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" required />
                                </div>
                                <div className="form-group col-sm-7 mx-auto text-center">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" required />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="submit" className="btn btn-primary btn-block col-sm-4">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginModalBody;