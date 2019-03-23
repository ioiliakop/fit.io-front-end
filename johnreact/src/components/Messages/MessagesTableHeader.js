import React, { Component } from 'react';

class MessagesTable extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="container py-3 text-center">
            <h2>Received Messages</h2>
        </div>

        <div className="container">
            <div className="table-responsive-lg">
                <table className="table table-striped table-bordered messages">
                    <thead>
                        <tr className="table-info">
                            <th></th>
                            <th>{this.props.folderType === 'inbox' ? 'From' : 'To'}</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.messages.map((m, index) => {
                                    console.log('Updating li for message ' + index);
                                    return <MessageRow key={m.id} msg={m} ></MessageRow>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> 
        </React.Fragment>
        );
    }
}

export default MessagesTable;