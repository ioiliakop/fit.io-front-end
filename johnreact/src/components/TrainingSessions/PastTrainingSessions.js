import React, { Component } from 'react';
import TrainingSessions from './TrainingSessions';

class PastTrainingSessions extends Component {
    render() {
        return (
            <TrainingSessions folderType='PAST' />
        );
    }
}

export default PastTrainingSessions;