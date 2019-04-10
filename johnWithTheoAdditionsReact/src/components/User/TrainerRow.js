import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, withRouter } from 'react-router-dom';

/**
 * 
 * @property {Object} props.trainer - the trainer object containing relative info
 */

class TrainerRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trainerAreas: [],
            trainerTypes: [],
            redirectToTrainersProfile: false,
            redirectToTrainersCalendar: false
        };
        this.setTrainersProfileRedirect = this.setTrainersProfileRedirect.bind(this);
        this.setTrainersCalendarRedirect = this.setTrainersCalendarRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    componentDidMount() {
        this.fetchTrainerTypes();
        this.fetchTrainerAreas();
    }

    componentDidUpdate(prevProps) {
        if (this.props.trainer.id !== prevProps.trainer.id) {
            this.fetchTrainerTypes();
            this.fetchTrainerAreas();
        }
    }

    fetchTrainerTypes() {
        const url = 'http://localhost:8080/types/trainer-types/' + this.props.trainer.id;

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('fetchTrainerTypes for trainerId', this.props.trainer.id, 'Response status:', response.status);
            if (response.status === 200) {
                response.json().then(trainerTypes => {
                    console.log('fetchTrainerTypes for trainerId', this.props.trainer.id, ' response data:', trainerTypes);
                    console.log('Saving fetched training types to state');
                    this.setState({
                        trainerTypes: trainerTypes
                    });
                })
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch trainer types');
    }

    fetchTrainerAreas() {
        const url = 'http://localhost:8080/areas/trainer-areas/' + this.props.trainer.id;

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(trainerAreas => {
                    console.log('fetchTrainerAreas response data:', trainerAreas);
                    console.log('Saving fetched training areas to state');
                    this.setState({
                        trainerAreas: trainerAreas
                    });
                })
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch trainer areas');
    }

    setTrainersProfileRedirect() {
        this.setState({
            redirectToTrainersProfile: true
        });
    }

    setTrainersCalendarRedirect() {
        this.setState({
            redirectToTrainersCalendar: true
        });
    }

    renderRedirect() {
        // We pass trainer, trainerAreas, trainerTypes as props to the redirected TrainerProfile component/route
        if (this.state.redirectToTrainersProfile) {
            return <Redirect to={{
                pathname: '/trainer-profile/' + this.props.trainer.id,
                state: {
                    trainer: this.props.trainer,
                    trainerAreas: this.state.trainerAreas,
                    trainerTypes: this.state.trainerTypes
                }
            }} />
        }

        if (this.state.redirectToTrainersCalendar) return <Redirect to={'/trainersCalendar/' + this.props.trainer.id} />
    }

    render() {
        const trainerTypes = this.state.trainerTypes;
        const trainerAreas = this.state.trainerAreas;
        return (
            <div className="container-fluid py-1">
                {this.renderRedirect()}
                <div className="container shadow-sm">
                    <div className="row bg-light border">
                        {/* We display fontawesome default icon if trainer hasn't uploaded a photo */}
                        {this.props.trainer.photoLink === '' ?
                            (<div className="col-md-3 border-right text-center pt-5 pb-2">
                                <FontAwesomeIcon icon={["far", "user-circle"]} size="5x" />
                            </div>) :
                            (<div className="col-md-3 border-right text-center py-3">
                                <img className="img-fluid" src={this.props.trainer.photoLink} alt="Profile" style={{ height: "150px" }} />
                            </div>)}
                        <div className="col-md-3 pt-4 px-4 border-right text-center">
                            <h4 className="text-primary">{this.props.trainer.firstName + ' ' + this.props.trainer.lastName}</h4>
                            <p>{trainerTypes.map((trainerType, index) => {
                                return (index < (trainerTypes.length - 1)) ? (trainerType.title + ' - ') : trainerType.title;
                            })}</p>
                        </div>
                        <div className="col-md-3 pt-4 px-4 border-right">
                            <p className="card-text"><FontAwesomeIcon icon="map-marked-alt" /> &nbsp;{trainerAreas.map((trainerArea, index) => {
                                return (index < (trainerAreas.length - 1)) ? (trainerArea.city + ' - ') : trainerArea.city;
                            })}</p>
                            <p className="card-text"><FontAwesomeIcon icon="wallet" /> &nbsp;{this.props.trainer.price}&euro;</p>
                        </div>
                        <div className="col-lg-3 p-5">
                            {/* <button type="button" className="btn btn-info btn-block" onClick={this.redirectToTrainerProfile}>PROFILE</button> */}
                            <button type="button" className="btn btn-info btn-block" onClick={this.setTrainersProfileRedirect}>PROFILE</button>
                            <button type="button" className="btn btn-danger btn-block" onClick={this.setTrainersCalendarRedirect}>APPOINTMENT</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter(TrainerRow);