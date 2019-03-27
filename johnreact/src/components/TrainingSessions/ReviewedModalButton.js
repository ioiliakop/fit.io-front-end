import React, { Component } from 'react';

class ReviewedModalButton extends Component {

    render() {
        return (
            <React.Fragment>
            <button type="button" className="btn btn-info btn-block" data-toggle="modal" data-target={'#rm_' + this.props.trsData.id}>REVIEWED</button>
            <div className="modal fade" id={'rm_' + this.props.trsData.id} tabIndex="-1" role="dialog" aria-labelledby={'rmLabel_' + this.props.trsData.id} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={'rmLabel_' + this.props.trsData.id}>Already reviewed training session</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row text-center mb-2">
                                <div className="col-md-8 mx-auto">You have already left a review on for your {this.props.trsData.trainingType.title} training session with {this.props.trsData.trainer.firstName} {this.props.trsData.trainer.lastName}</div>
                            </div>
                            <div className="col-8 col-sm-6 mx-auto">
                                <i className="far fa-calendar-alt"></i> &nbsp;{this.props.trsData.date}, {this.props.trsData.time}
                            </div>
                            <div className="col-8 col-sm-6 mx-auto">
                                <i className="fas fa-map-marked-alt"></i> &nbsp;{this.props.trsData.area.address}, {this.props.trsData.area.city}
                            </div>
                            <div className="col-8 col-sm-6 mx-auto">
                                <i className="fas fa-wallet"></i> &nbsp;{this.props.trsData.trainer.price}&euro;
                            </div>
                            <hr></hr>
                            <div className="mt-3 text-center">
                                <h5>Your Review:</h5>
                                <div>{this.props.review.comment}</div>
                                <small className="text-muted">{(new Date(this.props.review.date)).toDateString()}</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default ReviewedModalButton;