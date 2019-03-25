import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/user-context';
import TrainingSession from '../TrainingSessions/TrainingSession';
import PastTrainingSession from '../TrainingSessions/PastTrainingSession';

class TrainingSessions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trainingSessions: [],
        };
    }

    static contextType = UserContext;

    componentDidMount() {
        console.log('TrainingSessions component did mount');
        const url = 'http://localhost:8080/session/client-sessions';

        // Testing datetimes
        const now = new Date();
        console.log('Current date:', now);
        console.log('getDate', now.getDate());
        console.log('getDay', now.getDay());
        console.log('toLocaleDateString', now.toLocaleDateString());
        console.log('valueOf', now.valueOf());
        console.log('toLocaleTimeString', now.toLocaleTimeString());
        console.log('getTime', now.getTime());

        const otherdate = new Date('2019-03-17 16:00:00');
        console.log('Other date:', otherdate)
        console.log('valueOf', otherdate.valueOf());


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
                    <div className="container py-3 text-center">
                        <h2>Training Sessions</h2>
                    </div>

                    {this.state.trainingSessions.map((t, index) => {
                        console.log('Updating li for training session ' + index);
                        let trsDate = new Date(t.date + ' ' + t.time);
                        console.log('Training session date:', trsDate);
                        let now = new Date();
                        console.log('Now value:', now.valueOf());
                        console.log('Training Session date value:', trsDate.valueOf());
                        if (now.valueOf() > trsDate.valueOf()) {
                            return <TrainingSession key={'mk_' + t.id} trs={t} timeStatus="past"/>
                        } else {
                            return <TrainingSession key={'mk_' + t.id} trs={t} />
                        }
                    })}
                </React.Fragment>
            );
        }
    }

}

export default TrainingSessions;