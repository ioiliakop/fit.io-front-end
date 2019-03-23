import React, { Component } from 'react';

class MessageRow extends Component {
    render() {
        return (
            <tr>
                <td></td>
                <td>{this.props.msg.sender.username}</td>
                <td>{this.props.msg.text}</td>
                <td>{this.props.msg.date}</td>
            </tr>
        );
    }
}

export default MessageRow;