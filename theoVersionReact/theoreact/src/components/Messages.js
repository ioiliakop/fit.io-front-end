import React, { Component } from "react";
import "./stylesheets/messages.css";
import { Consumer } from "../context";
import Message from "./Message";

class Messages extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { inbox } = value;
          return (
            <div class="container">
              <div class="row col-md-6 col-md-offset-2 custyle">
                <table class="table table-striped custab">
                  <thead>
                    <a href="#" class="btn btn-primary btn-xs pull-right">
                      <b>+</b> Add new categories
                    </a>
                    <tr>
                      <th>ID</th>
                      <th>Sender</th>
                      <th>Text</th>
                      <th>Date</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  {inbox.map(
                    message => {
                      console.log(message);
                      return <Message message={message} />;
                    }

                    // <tr>
                    //   <td>1</td>
                    //   <td>News</td>
                    //   <td>News Cate</td>
                    //   <td class="text-center">
                    //     <a class="btn btn-info btn-xs" href="#">
                    //       <span class="glyphicon glyphicon-edit" /> Edit
                    //     </a>
                    //     <a href="#" class="btn btn-danger btn-xs">
                    //       <span class="glyphicon glyphicon-remove" /> Del
                    //     </a>
                    //   </td>
                    // </tr>
                  )}
                </table>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Messages;
