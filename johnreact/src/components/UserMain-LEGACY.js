import React, { Component } from 'react';

class UserMain extends Component {
    render() {
        return (
            /* navbar that will be used 
            Only for reference for the time being
            was originally implemented with pills-tabs
            will prolly be rafactored to remove pills
            */
            <div className="container-fluid bg-light">
                <div className="container">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-myTrainingSessions-tab" data-toggle="pill"
                                href="#pills-myTrainingSessions" role="tab" aria-controls="pills-myTrainingSessions"
                                aria-selected="true">My Training Sessions</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-myMessages-tab" data-toggle="pill" href="#pills-myMessages" role="tab"
                                aria-controls="pills-myMessages" aria-selected="false">My Messages</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-myReviews-tab" data-toggle="pill" href="#pills-myReviews" role="tab"
                                aria-controls="pills-myReviews" aria-selected="false">My Reviews</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-myProfile-tab" data-toggle="pill" href="#pills-myProfile" role="tab"
                                aria-controls="pills-myProfile" aria-selected="false">My Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserMain;