import React, { Component } from 'react';
import ReviewModalButton from './ReviewModalButton';
import ContactModalButton from './ContactModalButton';

/**
 * Different Actions available to each training session
 * Depending on time status (future/past) and other parameters
 */
class AvailableActionsButtons extends Component {

    // Will be used to check if user has already reviewed the session
    // Back not sending proper response yet
    sessionIsReviewed() {
        const url = 'http://localhost:8080/session/review/' + this.props.trsData.id;
        fetch(url, {
            method: 'GET',
            // headers: {
            //     'X-MSG-AUTH': localStorage.getItem('token'),
            //     'Accept': 'application/json',
            // }
        }).then(response => {
        }).catch(error => console.error('Error:', error));
    }

    render() {
        if (this.props.timeStatus === 'PAST') {
            return (
                <React.Fragment>
                    <ReviewModalButton trsData={this.props.trsData} />
                    {/* <button type="button" className="btn btn-info btn-block">REVIEW <i className="far fa-star"></i></button> */}
                    <button type="button" className="btn btn-outline-info btn-block">NEW APPOINTMENT</button>
                </React.Fragment>
            );
        } else if (this.props.timeStatus === 'FUTURE') {
            return (
                <React.Fragment>
                    <ContactModalButton trsData={this.props.trsData} />
                    {/* <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target={'cm_'+props.trsData.id}>CONTACT TRAINER</button> */}
                    {/* <ContactModal trsDt={props.trsData} /> */}
                    <button type="button" className="btn btn-danger btn-block">CANCEL <i className="fas fa-ban"></i></button>
                </React.Fragment>
            );
        } else {
            console.log('Unknown timeStatus for Training Session:', this.props.timeStatus);
        }
    }
}

export default AvailableActionsButtons;