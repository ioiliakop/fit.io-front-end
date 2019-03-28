import React, { Component } from 'react';
import Messages from './Messages-LEGACY';
import MessagesPaginated from './MessagesPaginated';

class OutboxMessages extends Component {
    render() {
        return (
            // <Messages folderType='outbox'/>
            <MessagesPaginated folderType='outbox' />
        );
    }
}

export default OutboxMessages;