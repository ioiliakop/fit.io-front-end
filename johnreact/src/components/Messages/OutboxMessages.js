import React, { Component } from 'react';
import Messages from './Messages';

class OutboxMessages extends Component {
    render() {
        return (
            <Messages folderType='outbox'/>
        );
    }
}

export default OutboxMessages;