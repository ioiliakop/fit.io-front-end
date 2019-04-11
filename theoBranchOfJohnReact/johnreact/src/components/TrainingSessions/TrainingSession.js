import React, { Component } from 'react';
import AvailableActionsButtons from './AvailableActionsButtons';
import Role from '../Role';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class TrainingSession extends Component {

    generatePicture = () => {
        if (this.props.trs.trainer.photoLink == "" || this.props.trs.trainer.photoLink == null) {
            return (<img className="img-fluid" src="https://www.chiosstartup.com/1.jpg" alt="Profile pic" />)
        } else {
            return (<img className="img-fluid" src={this.props.trs.trainer.photoLink} alt="Profile pic" />)
        }
    }

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
            <div className="container-fluid py-1">
                <div className="container">
                    <div className="row bg-light border">
                        <div className="col-lg-3 border-right text-center pt-5">
                            {this.generatePicture()}
                            {/* <img className="img-fluid" src="/img/sample_trainer_1_thumb.jpg" alt="Profile pic" /> */}
                        </div>
                        <div className="col-lg-3 pt-4 px-4 border-right text-center">
                            <h6>{othersTitle}</h6>
                            <h4 className="text-primary">{othersFullName}</h4>
                            <h6>Training type:</h6>
                            <h5 className="text-primary">{this.props.trs.trainingType.title}</h5>
                        </div>
                        <div className="col-lg-3 pt-4 px-4 border-right">
                            <p className="card-text"><FontAwesomeIcon icon={["far", "calendar-alt"]} /> &nbsp;{this.props.trs.date}, {this.props.trs.time}</p>
                            <p className="card-text"><FontAwesomeIcon icon="map-marked-alt" /> &nbsp;{this.props.trs.area.address}, {this.props.trs.area.city}</p>
                            <p className="card-text"><FontAwesomeIcon icon="wallet" /> &nbsp;{this.props.trs.trainer.price}&euro;</p>
                        </div>
                        <div className="col-lg-3 p-5">
                            <AvailableActionsButtons timeStatus={this.props.timeStatus} trsData={this.props.trs} userRole={this.props.userRole} />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default TrainingSession;