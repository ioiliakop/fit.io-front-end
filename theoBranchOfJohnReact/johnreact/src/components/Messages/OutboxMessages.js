import React, { Component } from 'react';
import Messages from './Messages-LEGACY';
import MessagesPaginated from './MessagesPaginated';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

class OutboxMessages extends Component {
    render() {
        return (
            // <Messages folderType='outbox'/>
            <MessagesPaginated folderType='OUTBOX' />
        );
    }
}

export default withAuthorization(OutboxMessages, [Role.User, Role.Trainer, Role.Admin], true);