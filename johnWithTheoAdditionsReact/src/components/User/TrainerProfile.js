import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from '../../context/user-context';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../../hoc/Role';
import ReviewRow from './ReviewRow';

/**
 * The trainer profile page, giving relative info, reviews and ability to book an appointment
 * optional props are either passed via redirect from another component or fetched via ajaxa calls if missing
 * 
 * @param {Number} props.trainerId - the trainer id matched from route uri
 * @property {Object} [props.trainer] - the trainer object
 * @property {Array} [props.trainerAreas] - the areas the trainer has chosen for availability
 * @property {Array} [props.trainerTypes] - the training types the trainer specializes in
 */
class TrainerProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trainer: {},
            trainerAreas: [],
            trainerTypes: [],
            trainerReviews: [],
            redirect: false
        }
        this.trainerId = props.match.params.trainerId;
        console.log('Trainer id passed from url param:', this.trainerId);
        this.setRedirect = this.setRedirect.bind(this);
    }

    static contextType = UserContext;

    componentDidMount() {
        // we check if the component was reached through redirect where it carries neccessary props
        if (this.props.location.state !== undefined) {
            this.setState({
                trainer: this.props.location.state.trainer,
                trainerAreas: this.props.location.state.trainerAreas,
                trainerTypes: this.props.location.state.trainerTypes
            });
        } else { // else we make necessary ajax calls to get them
            this.fetchTrainer();
            this.fetchTrainerAreas();
            this.fetchTrainerTypes();
        }
        this.fetchTrainerReviews();
    }

    // is not needed if component was rendered through redirect
    // all trainer info needed is passed through redirect as props
    fetchTrainer() {
        const url = 'http://localhost:8080/find/getUser/' + this.trainerId;

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('fetchTrainer Response:', response);
            response.json().then(trainer => {
                if (response.status === 200) {
                    this.setState({
                        trainer: trainer
                    });
                }
            })
        }).catch(error => console.error('Error:', error));
    }

    fetchTrainerTypes() {
        const url = 'http://localhost:8080/types/trainer-types/' + this.trainerId;

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('fetchTrainerTypes for trainerId', this.trainerId, 'Response status:', response.status);
            if (response.status === 200) {
                response.json().then(trainerTypes => {
                    console.log('fetchTrainerTypes for trainerId', this.trainerId, ' response data:', trainerTypes);
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
        const url = 'http://localhost:8080/areas/trainer-areas/' + this.trainerId;

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

    fetchTrainerReviews() {
        const url = 'http://localhost:8080/session/reviews-trainer/' + this.trainerId + '?start=0&end=9';
        console.log('fetch reviews url:', url);

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    console.log('fetchTrainerReviews response data:', data);
                    this.setState({
                        trainerReviews: data.results
                    });
                })
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch trainer reviews');
    }

    setRedirect() {
        this.setState({
            redirect: true
        });
    }

    renderRedirect() {
        // We pass trainer, trainerAreas, trainerTypes as props to the redirected TrainerProfile component/route
        if (this.state.redirect) {
            return <Redirect to={'/trainersCalendar/' + this.trainerId} />
            // }
            //         state: {
            //             trainer: this.state.trainer,
            //             trainerAreas: this.state.trainerAreas,
            //             trainerTypes: this.state.trainerTypes
            //          }
            //     }} />
        }
    }

    render() {
        const trainerTypes = this.state.trainerTypes;
        const trainerAreas = this.state.trainerAreas;
        return (
            <div className="container complete-profile">
                {this.renderRedirect()}
                <div className="container mb-4 p-4 col-9 bg-light shadow profile">
                    <div className="row mx-auto profile-header-info">
                        <div className="container col-md-3 photo">
                            {this.state.trainer.photoLink ?
                                <img src={this.state.trainer.photoLink} alt="trainer" className="img-thumbnail" /> :
                                <FontAwesomeIcon icon={["far", "user-circle"]} size="10x" style={{ opacity: 0.4 }} />
                            }
                        </div>
                        <div className="container col-md-4 text-center trainer-info">
                            <h3 className="text-primary">{this.state.trainer.firstName + ' ' + this.state.trainer.lastName}</h3>
                            <h5 className="mt-3">Specializes in:</h5>
                            <h6 className="text-primary">{trainerTypes.map((trainerType, index) => {
                                return (index < (trainerTypes.length - 1)) ? (trainerType.title + ' - ') : trainerType.title;
                            })}</h6>
                            <h5 className="mt-3">Available in areas:</h5>
                            <h6 className="text-primary">{trainerAreas.map((trainerArea, index) => {
                                return (index < (trainerAreas.length - 1)) ? (trainerArea.city + ' - ') : trainerArea.city;
                            })}</h6>
                        </div>
                        <div className="container col-md-3 py-5 book-info">
                        {/* Unregistered users can view profile but not book appointment */}
                            {this.context.isLoggedIn ? (
                                <React.Fragment>
                                    <button className="btn btn-danger btn-block mt-auto" onClick={this.setRedirect}>Book appointment</button>
                                    <p className="text-middle text-center p-2 rounded mb-auto">Cost: <span className="text-danger">{this.state.trainer.price}&euro;</span></p>
                                </React.Fragment>
                            ) : (
                                    <p className="text-middle text-center p-2 rounded mb-auto bg-danger text-white">Register or Login to Book your Session!!</p>
                                )}
                        </div>
                    </div>

                    <div className="mt-3 profile-description">
                        <h5>Description</h5>
                        <p className="lead">{this.state.trainer.description}</p>
                    </div>
                </div>

                {/* Only if the trainer has reviews will this section be rendered */}
                {(this.state.trainerReviews.length > 0) && (
                    <div className="container mx-auto pt-2 col-md-8 bg-light shadow reviews">
                        <h3 className="text-danger text-center">Latest Reviews</h3>
                        {this.state.trainerReviews.map((review, index) => {
                            console.log('Updating li for review ' + index);
                            return <ReviewRow key={index} review={review} ></ReviewRow>
                        })}
                    </div>
                )}
            </div>
        );
    }

}

export default withAuthorization(TrainerProfile, [Role.Guest, Role.User]);