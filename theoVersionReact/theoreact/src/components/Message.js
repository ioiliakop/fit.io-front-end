import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.message.id}</td>
        <td>{this.props.message.sender.firstName}</td>
        <td>{this.props.message.text}</td>
        <td>{this.props.message.date}</td>
        <td class="text-center">
          <a class="btn btn-info btn-xs" href="#">
            <span class="glyphicon glyphicon-edit" /> Edit
          </a>
          <a href="#" class="btn btn-danger btn-xs">
            <span class="glyphicon glyphicon-remove" /> Del
          </a>
        </td>
      </tr>
    );
  }
}

export default Message;
