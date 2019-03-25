import React, { Component } from 'react';

// Different Actions available for past and future training sessions
function FutureOrPastActionButtons(props) {
    if (props.timeStatus === 'past') {
        return (
            <React.Fragment>
                <button type="button" class="btn btn-info btn-block">REVIEW <i class="far fa-star"></i></button>
                <button type="button" class="btn btn-outline-info btn-block">NEW APPOINTMENT</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary btn-block">CONTACT TRAINER</button>
                <button type="button" className="btn btn-danger btn-block">CANCEL <i className="fas fa-ban"></i></button>
            </React.Fragment>
        );
    }
}

class TrainingSession extends Component {
    render() {
        return (
            <div className="container-fluid py-1">
                <div className="container">
                    <div className="row bg-light border">
                        <div className="col-lg-3 border-right text-center pt-5">
                            <img className="img-fluid" src="./img/sample_trainer_1_thumb.jpg" alt="Trainer 1" />
                        </div>
                        <div className="col-lg-3 pt-4 px-4 border-right">
                            <h4 className="text-primary">{this.props.trs.trainer.firstName} {this.props.trs.trainer.lastName}</h4>
                            <p>{this.props.trs.trainingType.title}</p>
                        </div>
                        <div className="col-lg-3 pt-4 px-4 border-right">
                            <p className="card-text"><i className="fas fa-wallet"></i> &nbsp;{this.props.trs.trainer.price}&euro;</p>
                            <p className="card-text"><i className="far fa-calendar-alt"></i> &nbsp;{this.props.trs.date}, {this.props.trs.time}</p>
                            <p className="card-text"><i className="fas fa-map-marked-alt"></i> &nbsp;{this.props.trs.area.address}, {this.props.trs.area.city}</p>
                        </div>
                        <div className="col-lg-3 p-5">
                            <FutureOrPastActionButtons timeStatus={this.props.timeStatus}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrainingSession;