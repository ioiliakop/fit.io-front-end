import React, { Component } from 'react';
import Messages from './Messages';

class InboxMessages extends Component {
    render() {
        return (
            <Messages folderType='inbox'/>
        );
    }
}

export default InboxMessages;