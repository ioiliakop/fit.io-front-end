import React, { Component } from 'react';
import UserContext from '../../context/user-context';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

class MyAccount extends Component {

    static contextType = UserContext;

    //TODO
    handleImageUpload(){};

    render() {
        return (
            <div className="container py-3 my-3">
                <div className="form-row">

                    {/* <!-- Left Section --> */}
                    <div className="col-8">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputUsername">Username</label>
                                    <input type="text" className="form-control" id="inputUsername" placeholder="Username" readOnly value={this.context.userInfo.username} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" readOnly value={this.context.userInfo.email} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputFirstName">First Name</label>
                                    <input type="text" className="form-control" id="inputLastName" placeholder="First name" readOnly value={this.context.userInfo.firstName} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputLastName">Last Name</label>
                                    <input type="text" className="form-control" id="inputLastName" placeholder="Last name" readOnly value={this.context.userInfo.lastName} />
                                </div>
                            </div>
                            {/* <!-- <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St">
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2"
                                placeholder="Apartment, studio, or floor">
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity">
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip">
                            </div>
                        </div> --> */}
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    </div>

                    {/* <!-- Right Section --> */}
                    <div className="container col-md-4 text-center p-5">
                        <div><i className="far fa-user-circle fa-8x"></i></div>
                        <div className="my-2">{this.context.userInfo.firstName + ' ' + this.context.userInfo.lastName}<div className="text-muted">({this.context.userInfo.role.name})</div></div>                       
                        <div className="custom-file text-left">
                            <input type="file" className="custom-file-input" id="profilePic" accept=".jpg, .png, .gif" />
                            <label className="custom-file-label" htmlFor="profilePic">Upload Picture</label>
                        </div>
                        <img src="../../../userimages/user1.jpg"/> {/* left for testing - still considering where to upload */}
                        <button type="button" className="btn btn-primary btn-block my-3">Save Picture</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default withAuthorization(MyAccount, [Role.User, Role.Trainer, Role.Admin], true);