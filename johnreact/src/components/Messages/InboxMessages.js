import React, { Component } from 'react';
import Messages from './Messages-LEGACY';
import MessagesPaginated from './MessagesPaginated';

class InboxMessages extends Component {
    render() {
        return (
            // <Messages folderType='inbox'/>
            <MessagesPaginated folderType='inbox' />
        );
    }
}

export default InboxMessages;