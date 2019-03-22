import React, { Component } from 'react';
import MessageRow from './MessageRow';

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: {},
        };
    }

    componentDidMount() {
        console.log("Messages component did mount");
        const url = 'http://localhost:8080/messages/inbox';

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            response.json().then(function (data) {
                console.log('Response status:', response.status);
                console.log(data);
                // FIX error: 'this' is undefined??
                if (response.status === 200) {
                    console.log('Saving fetched messages to state');
                    // this.state = ({ 
                    //     messages: data 
                    // });
                    this.setState({ 
                        messages: data 
                    });
                    console.log('Messages in state:', this.state.messages);
                }
            })
        }).catch(error => console.error('Error:', error));

        //     window.$.ajax({
        //         url: 'http://localhost:3000/texts.json',
        //         dataType: 'json',                       
        //         type: 'GET'            
        //    }).then ( data => {
        //        console.log("Updating UI");
        //        this.setState({
        //            messages: data
        //        });
        //    });
    }

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
                                    <th>Sender</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {Object.keys(messages).map(k => {
                                    console.log('Updating li for ' + k);
                                    return <MessageRow key={k} msg={messages[k]}></MessageRow>
                                })} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Messages;