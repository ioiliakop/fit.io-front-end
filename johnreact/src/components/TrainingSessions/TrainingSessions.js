import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/user-context';
import TrainingSession from '../TrainingSessions/TrainingSession';

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
                        return <TrainingSession key={'mk_' + t.id} trs={t} />
                    })}
                </React.Fragment>
            );
        }
    }

}

export default TrainingSessions;