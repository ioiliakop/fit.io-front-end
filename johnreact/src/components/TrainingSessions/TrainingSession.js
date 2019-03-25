import React, { Component } from 'react';
import ContactModalButton from './ContactModalButton';

// Different Actions available for past and future training sessions
function FutureOrPastActionButtons(props) {
    if (props.timeStatus === 'past') {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-info btn-block">REVIEW <i className="far fa-star"></i></button>
                <button type="button" className="btn btn-outline-info btn-block">NEW APPOINTMENT</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <ContactModalButton trsData={props.trsDt} />
                {/* <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target={'cm_'+props.trsData.id}>CONTACT TRAINER</button> */}
                {/* <ContactModal trsDt={props.trsData} /> */}
                <button type="button" className="btn btn-danger btn-block">CANCEL <i className="fas fa-ban"></i></button>
            </React.Fragment>
        );
    }
}

// function ContactModal(props) {
//     return (
//         <div className="modal fade" id={'cm_' + props.trsDt.id} tabIndex="-1" role="dialog" aria-labelledby="contactModalLabel" aria-hidden="true">
//             <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="contactModalLabel">New message to {props.trsDt.trainer.firstName} {props.trsDt.trainer.lastName}</h5>
//                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                             <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         <form>
//                             <div className="form-group">
//                                 <label htmlFor="message-text" className="col-form-label">Message:</label>
//                                 <textarea className="form-control" id="message-text"></textarea>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                         <button type="button" className="btn btn-primary">Send message</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

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
                                <FutureOrPastActionButtons timeStatus={this.props.timeStatus} trsDt={this.props.trs} />
                            </div>
                        </div>
                    </div>
                </div>

        );
    }
}

export default TrainingSession;