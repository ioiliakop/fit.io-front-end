import React, { Component } from 'react';
import AvailableActionsButtons from './AvailableActionsButtons';
import Role from '../Role';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class TrainingSession extends Component {
    render() {
        // We initialize the values for the 'other' member of the training session
        // e.g. if the logged in user is a trainer, we want the info of the client to appear on the training session info and vice versa
        let othersFullName, othersTitle;
        if (this.props.userRole === Role.User) {
            othersFullName = this.props.trs.trainer.firstName + ' ' + this.props.trs.trainer.lastName;
            othersTitle = 'Trainer:';
        } else {
            othersFullName = this.props.trs.client.firstName + ' ' + this.props.trs.client.lastName;
            othersTitle = 'Client:';
        }
        return (         
            // <div className="container-fluid py-1 ">
                <div className="container my-2 shadow-sm">
                    <div className="row bg-light border">
                        <div className="col-md-3 border-right text-center pt-5">
                            <img className="img-fluid" src="/img/sample_trainer_1_thumb.jpg" alt="Trainer" />
                        </div>
                        <div className="col-md-3 pt-4 px-4 border-right text-center">
                            <h6>{othersTitle}</h6>
                            <h4 className="text-primary">{othersFullName}</h4>
                            <h6>Training type:</h6>
                            <h5 className="text-primary">{this.props.trs.trainingType.title}</h5>
                        </div>
                        <div className="col-md-3 pt-4 px-4 border-right">
                            <p className="card-text"><FontAwesomeIcon icon={["far", "calendar-alt"]} /> &nbsp;{this.props.trs.date}, {this.props.trs.time}</p>
                            <p className="card-text"><FontAwesomeIcon icon="map-marked-alt" /> &nbsp;{this.props.trs.area.city}</p>
                            <p className="card-text"><FontAwesomeIcon icon="wallet" /> &nbsp;{this.props.trs.trainer.price}&euro;</p>
                        </div>
                        <div className="col-md-3 p-5">
                            <AvailableActionsButtons timeStatus={this.props.timeStatus} trsData={this.props.trs} userRole={this.props.userRole} handle={this.props.handle} />
                        </div>
                    </div>
                </div>
            // </div>

        );
    }
}

export default TrainingSession;