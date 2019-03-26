import React, { Component } from 'react';
import TrainingSessions from './TrainingSessions';

class FutureTrainingSessions extends Component {
    render() {
        return (
            <TrainingSessions folderType='FUTURE' />
        );
    }
}

export default FutureTrainingSessions;