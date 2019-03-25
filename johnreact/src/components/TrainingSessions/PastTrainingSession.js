import React, { Component } from 'react';
import TrainingSession from './TrainingSession';

// Maybe won't be needed
class PastTrainingSession extends Component {
    render() {
        return (
            <TrainingSession timeStatus="past" />
        );
    }
}

export default PastTrainingSession;