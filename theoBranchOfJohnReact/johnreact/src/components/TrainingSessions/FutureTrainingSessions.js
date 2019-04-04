import React, { Component } from 'react';
import TrainingSessions from './TrainingSessions';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

class FutureTrainingSessions extends Component {
    render() {
        return (
            <TrainingSessions folderType='FUTURE' />
        );
    }
}

export default withAuthorization(FutureTrainingSessions, [Role.User, Role.Trainer, Role.Admin], true);