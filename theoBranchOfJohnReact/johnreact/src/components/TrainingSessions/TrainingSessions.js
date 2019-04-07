import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import UserContext from '../../context/user-context';
import TrainingSession from '../TrainingSessions/TrainingSession';
import ButtonLink from '../../components/Utils/ButtonLink';
import Role from '../Role';

class TrainingSessions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trainingSessions: [],
        };

        // Depending on props will get respective training sessions
        if (this.props.folderType === 'FUTURE') {
            this.trainingSessionsTitle = 'Future';
        } else if (this.props.folderType === 'PAST') {
            this.trainingSessionsTitle = 'Past';
        } else {
            console.error('Unknown messages folder type');
        }

    }

    static contextType = UserContext;

    componentDidMount() {
        console.log('TrainingSessions component did mount');
        // const url = 'http://localhost:8080/session/client-sessions';
        let url;

        // Making this element
        console.log('User Role: ', this.context.userInfo.role.name);
        if (this.context.userInfo.role.name === Role.User) {
            url = 'http://localhost:8080/session/client-sessions';
        } else if (this.context.userInfo.role.name === Role.Trainer) {
            url = 'http://localhost:8080/session/trainer-sessions';
        } else console.error('Invalid role for training session:', this.context.userInfo.role.name);

        // Testing datetimes
        // const now = new Date();
        // console.log('Current date:', now);
        // console.log('getDate', now.getDate());
        // console.log('getDay', now.getDay());
        // console.log('toLocaleDateString', now.toLocaleDateString());
        // console.log('valueOf', now.valueOf());
        // console.log('toLocaleTimeString', now.toLocaleTimeString());
        // console.log('getTime', now.getTime());
        // const otherdate = new Date('2019-03-17 16:00:00');
        // console.log('Other date:', otherdate)
        // console.log('valueOf', otherdate.valueOf());

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
                'Accept': 'application/json',
            }
        }).then(response => {
            response.json().then(data => {
                console.log('Response status:', response.status);
                console.log(data);
                // if (response.status === 200) {
                console.log('Saving fetched training sessions to state');
                this.setState({
                    trainingSessions: data
                });
                console.log('Training Sessions in state:', this.state.trainingSessions);
                // }
            })
        }).catch(error => console.error('Error:', error));

        console.log('End of fetch');
    }


    render() {
        if (!this.context.isLoggedIn) {
            // Redirect to Landing
            return (
                <Redirect to='/' />
            );
        } else {
            return (
                <React.Fragment>
                    <nav className="navbar navbar-light navbar-expand-md">
                        <div className="container col-sm pt-4 pb-0">
                            <ul className="navbar-nav mx-auto">
                                <li>
                                    <ButtonLink label="FUTURE" to="/training-sessions" location={this.props.location.pathname} />
                                </li>
                                <li>
                                    <span className="col-1"> </span>
                                </li>
                                <li>
                                    <ButtonLink label="PAST" to="/training-sessions/past" location={this.props.location.pathname} />
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="container py-3 text-center">
                        <h2>{this.trainingSessionsTitle} Training Sessions</h2>
                    </div>

                    {this.state.trainingSessions.map((t, index) => {
                        console.log('Updating li for training session ' + index);
                        let trsDate = new Date(t.date + ' ' + t.time);
                        console.log('Training session date:', trsDate);
                        let now = new Date();
                        console.log('Now value:', now.valueOf());
                        console.log('Training Session date value:', trsDate.valueOf());

                        // Adds only corresponding training sessions to array returned
                        if (now.valueOf() > trsDate.valueOf() && this.props.folderType === 'PAST') {
                            return <TrainingSession key={t.id} trs={t} timeStatus="PAST" userRole={this.context.userInfo.role.name} />
                        } else if (now.valueOf() < trsDate.valueOf() && this.props.folderType === 'FUTURE') {
                            return <TrainingSession key={t.id} trs={t} timeStatus="FUTURE" userRole={this.context.userInfo.role.name} />
                        } return console.error('Training Sessions return unknown Error');
                    })}
                </React.Fragment>
            );
        }
    }

}

export default withRouter(TrainingSessions);