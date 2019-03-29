import React, { Component } from 'react';

class MessageRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.i}</td>
                <td>{this.props.folderType === 'inbox' ? this.props.msg.sender.firstName +' '+ this.props.msg.sender.lastName : this.props.msg.receiver.username}</td>
                <td>{this.props.msg.text}</td>
                <td>{(new Date(this.props.msg.date)).toDateString()} {(new Date(this.props.msg.date)).toLocaleTimeString()}</td>
            </tr>
        );
    }
}

export default MessageRow;