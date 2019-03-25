import React, { Component } from 'react';

class ContactModalButton extends Component {

    constructor(props) {
        super(props);
        this.message = React.createRef();
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    componentDidMount() {
        console.log('trsData:', this.props.trsData);
        console.log('cm_' + this.props.trsData.id);
    }

    handleSendMessage = (trs) => {
        const url = 'http://localhost:8080/messages/save/' + trs.trainer.username;

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
            },
            body: this.message //current.value
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log('Message sent.');
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target={'#cm_' + this.props.trsData.id}>CONTACT</button>
                <div className="modal fade" id={'cm_' + this.props.trsData.id} tabIndex="-1" role="dialog" aria-labelledby={'cmLabel_' + this.props.trsData.id} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={'cmLabel_' + this.props.trsData.id}>New message to {this.props.trsData.trainer.firstName} {this.props.trsData.trainer.lastName}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor={'message-text_' + this.props.trsData.id} className="col-form-label">Message:</label>
                                        <textarea className="form-control" id={'message-text_' + this.props.trsData.id} ref={this.message} required ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSendMessage(this.props.trsData)}>Send message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ContactModalButton;