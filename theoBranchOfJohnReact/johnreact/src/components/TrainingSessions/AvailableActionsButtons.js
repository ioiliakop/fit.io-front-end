import React, { Component } from 'react';
import ReviewModalButton from './ReviewModalButton';
import ReviewedModalButton from './ReviewedModalButton';
import ContactModalButton from './ContactModalButton';
import Role from '../Role';

/**
 * Different Actions available to each training session
 * Depending on time status (future/past) and other parameters
 */
class AvailableActionsButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviewed: false,
            review: {}
        }
        this.fetchSessionReview = this.fetchSessionReview.bind(this);
    }

    componentDidMount() {
        console.log('AvailableActionsButtons didMount');
        console.log('TRS is:', this.props.trsData.id);
        console.log('TRS timeStatus:', this.props.timeStatus);

        if (this.props.timeStatus === 'PAST') {
            this.fetchSessionReview();
        }
    }

    // check if current training session has already been reviewed
    // if yes, we set state accordingly and pass it as props to relative child button/modal
    fetchSessionReview() {
        const url = 'http://localhost:8080/session/review/' + this.props.trsData.id;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log('sessionIsReviewed Response status:', response.status);
            console.log('Response', response);
            try {
                response.json().then(data => {
                    console.log('Training session has already been reviewed');
                    console.log('Review Data returned:', data);
                    this.setState({ reviewed: true, review: data });
                })
            } catch (e) {
                console.log('No review exists for this training session');
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        // We return different options, depending on user role (user/trainer) and time status of training session (upcoming, past)
        if (this.props.userRole === Role.User) {
            if (this.props.timeStatus === 'PAST') {
                return (
                    <React.Fragment>
                        {this.state.reviewed ? <ReviewedModalButton trsData={this.props.trsData} review={this.state.review} userRole={this.props.userRole} /> : <ReviewModalButton trsData={this.props.trsData} handle={this.fetchSessionReview} />}
                        <button type="button" className="btn btn-outline-info btn-block">NEW APPOINTMENT</button>
                    </React.Fragment>
                );
            } else if (this.props.timeStatus === 'FUTURE') {
                return (
                    <React.Fragment>
                        <ContactModalButton trsData={this.props.trsData} userRole={this.props.userRole} />
                        <button type="button" className="btn btn-danger btn-block">CANCEL <i className="fas fa-ban"></i></button>
                    </React.Fragment>
                );
            } else {
                console.error('Unknown timeStatus for Training Session:', this.props.timeStatus);
            }
        } else if (this.props.userRole === Role.Trainer) {
            if (this.props.timeStatus === 'PAST') {
                return (
                    <React.Fragment>
                        {this.state.reviewed && <ReviewedModalButton trsData={this.props.trsData} review={this.state.review} userRole={this.props.userRole} />}
                        <ContactModalButton trsData={this.props.trsData} userRole={this.props.userRole} />
                    </React.Fragment>
                );
            } else if (this.props.timeStatus === 'FUTURE') {
                return (
                    <React.Fragment>
                        <ContactModalButton trsData={this.props.trsData} userRole={this.props.userRole} />
                        <button type="button" className="btn btn-danger btn-block">CANCEL <i className="fas fa-ban"></i></button>
                    </React.Fragment>
                );
            } else {
                console.error('Unknown timeStatus for Training Session:', this.props.timeStatus);
            }
        } else {
            console.error('Unknown userRole for Training Session:', this.props.userRole);
        }
    }

}

export default AvailableActionsButtons;