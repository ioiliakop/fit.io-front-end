import React, { Component } from 'react';
import ReplyModalButton from './ReplyModalButton';

class MessageRow extends Component {

    render() {
        return (
            <tr>
                <th scope="row">{this.props.i}</th>
                <td>{this.props.folderType === 'INBOX' ? this.props.msg.sender.firstName + ' ' + this.props.msg.sender.lastName : this.props.msg.receiver.firstName + ' ' + this.props.msg.receiver.lastName}</td>
                <td>{this.props.msg.text}</td>
                <td>{(new Date(this.props.msg.date)).toDateString()} {(new Date(this.props.msg.date)).toLocaleTimeString()}</td>
                <td><ReplyModalButton msg={this.props.msg} folderType={this.props.folderType} /></td>
            </tr>
        );
    }
}

export default MessageRow;