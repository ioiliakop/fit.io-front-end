import React, { Component } from 'react';
import MessageRow from './MessageRow';
// import './dataTables.js';

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        if (this.props.folderType === 'inbox') {
            this.messagesTitle = 'Received';
            this.senderOrReceiver = 'Sender';
            this.fetchUrl = 'http://localhost:8080/messages/inbox';
        } else if (this.props.folderType === 'outbox') {
            this.messagesTitle = 'Sent';
            this.senderOrReceiver = 'Receiver';
            this.fetchUrl = 'http://localhost:8080/messages/sent';
        } else {
            console.log('Unknown messages folder type');
        }
    }

    componentDidMount() {
        console.log('Messages component did mount');
        // const url = 'http://localhost:8080/messages/inbox';

        fetch(this.fetchUrl, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
                'Accept': 'application/json',
            }
        }).then(response => {
            response.json().then(data => {
                console.log('Response status:', response.status);
                console.log(data);
                // if (response.status === 200) {
                console.log('Saving fetched messages to state');
                this.setState({
                    messages: data
                });
                console.log('Messages in state:', this.state.messages);
                // }
            })
        }).catch(error => console.error('Error:', error));

        console.log('End of fetch');

        // Trying to include script for dataTables integration
        // not working
        // const script = document.createElement("script");
        // script.src = "./dataTables.js";
        // console.log('datatable script source:', script.src);
        // script.async = true;
        // document.body.appendChild(script);
        // EPIC FAIL
    }

    render() {
        return (
            <React.Fragment>
                <div className="container py-3 text-center">
                    <h2>{this.messagesTitle} Messages</h2>
                </div>

                <div className="container">
                    <div className="table-responsive-lg">
                        <table className="table table-striped table-bordered" id="messagesTable">
                            <thead>
                                <tr className="table-info">
                                    <th></th>
                                    <th>{this.senderOrReceiver}</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.messages.map((m, index) => {
                                    console.log('Updating li for message ' + index);
                                    return <MessageRow key={'mk_'+m.id} msg={m} folderType={this.props.folderType}></MessageRow>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Messages;