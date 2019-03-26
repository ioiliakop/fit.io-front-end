import React, { Component } from 'react';

class ReviewModalButton extends Component {

    constructor(props) {
        super(props);
        this.review = React.createRef();
        this.handleSubmitReview = this.handleSubmitReview.bind(this);
    }

    componentDidMount() {
        console.log('trsData:', this.props.trsData);
        console.log('rm_' + this.props.trsData.id);
    }

    handleSubmitReview() {
        console.log('Inside handleSubmitReview');
        console.log('ReviewRef:', this.review.current.value);
        const url = 'http://localhost:8080/session/add-comment/' + this.props.trsData.id;

        fetch(url, {
            method: 'POST',
            // headers: {
            //     'X-MSG-AUTH': localStorage.getItem('token'),
            // },
            body: this.review.current.value
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log('Review Submitted');
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-info btn-block" data-toggle="modal" data-target={'#rm_' + this.props.trsData.id}>REVIEW <i className="far fa-star"></i></button>
                <div className="modal fade" id={'rm_' + this.props.trsData.id} tabIndex="-1" role="dialog" aria-labelledby={'rmLabel_' + this.props.trsData.id} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={'rmLabel_' + this.props.trsData.id}>Review {this.props.trsData.trainer.firstName} {this.props.trsData.trainer.lastName}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row text-center mb-2">
                                    <div className="col-md-8 mx-auto">For your {this.props.trsData.trainingType.title} training session</div>
                                </div>
                                {/* <div className="col-md-6 border mx-auto">
                                    <p><i className="far fa-calendar-alt"></i> &nbsp;{this.props.trsData.date}, {this.props.trsData.time}</p>
                                    <p><i className="fas fa-map-marked-alt"></i> &nbsp;{this.props.trsData.area.address}, {this.props.trsData.area.city}</p>
                                </div> */}
                                <div className="col-8 col-sm-6 mx-auto">
                                    <i className="far fa-calendar-alt"></i> &nbsp;{this.props.trsData.date}, {this.props.trsData.time}
                                </div>
                                <div className="col-8 col-sm-6 mx-auto">
                                    <i className="fas fa-map-marked-alt"></i> &nbsp;{this.props.trsData.area.address}, {this.props.trsData.area.city}
                                </div>
                                <div className="col-8 col-sm-6 mx-auto">
                                    <i className="fas fa-wallet"></i> &nbsp;{this.props.trsData.trainer.price}&euro;
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor={'review-text_' + this.props.trsData.id} className="col-form-label">Review:</label>
                                        <textarea className="form-control" id={'review-text_' + this.props.trsData.id} ref={this.review} required ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleSubmitReview}>Submit Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ReviewModalButton;