import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import UserContext from '../../context/user-context';
import MessageRow from './MessageRow';
import ButtonLink from '../Utils/ButtonLink';

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

    static contextType = UserContext;

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
        if (!this.context.isLoggedIn) {
            // Redirect to Landing
            return (
                <Redirect to='/' />
            );
        } else {
            return (
                <React.Fragment>
                    <nav className="navbar navbar-light navbar-expand-md">
                        <div className="container col-sm pt-4 pb-0">
                            <ul className="navbar-nav mx-auto">
                                <li>
                                    {/* <button className="btn btn-outline-primary" type="button">Register as User</button> */}
                                    <ButtonLink label="INBOX" to="/messages/in" location={this.props.location.pathname} />
                                </li>
                                <li>
                                    <span className="col-1"> </span>
                                </li>
                                <li>
                                    {/* <button className="btn btn-outline-primary" type="button">Register as Trainer</button> */}
                                    <ButtonLink label="SENT" to="/messages/out" location={this.props.location.pathname} />
                                </li>
                            </ul>
                        </div>
                    </nav>

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
                                        return <MessageRow key={'mk_' + m.id} msg={m} folderType={this.props.folderType}></MessageRow>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

}

export default withRouter(Messages);