import React, { Component } from 'react';
import Messages from './Messages-LEGACY';
import MessagesPaginated from './MessagesPaginated';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

class InboxMessages extends Component {
    render() {
        return (
            // <Messages folderType='inbox'/>
            <MessagesPaginated folderType='INBOX' />
        );
    }
}

export default withAuthorization(InboxMessages, [Role.User, Role.Trainer, Role.Admin], true);