import React, { Component } from 'react';
import TrainingSession from './TrainingSession';

// NOT USED ATM
// Maybe won't be needed
class PastTrainingSession extends Component {
    render() {
        return (
            <TrainingSession timeStatus="past" />
        );
    }
}

export default PastTrainingSession;