import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../../context/user-context';
import MessageRow from './MessageRow';
import ButtonLink from '../Utils/ButtonLink';
import PaginationFooter from './PaginationFooter';
import PaginationHeader from './PaginationHeader';

class Messages extends Component {

    constructor(props) {
        super(props);
        this.messagesPerPageOptions = [5, 10, 25];
        this.state = {
            currentPage: 1,
            totalPages: 1,
            totalMessages: 0,
            messagesPerPage: this.messagesPerPageOptions[0],
            messages: [],
        };
        this.setActivePage = this.setActivePage.bind(this);
        this.setMessagesPerPage = this.setMessagesPerPage.bind(this);
        this.fetchPageMessages = this.fetchPageMessages.bind(this);

        // Check for folderType
        if (this.props.folderType === 'INBOX') {
            this.messagesTitle = 'Received';
            this.senderOrReceiver = 'Sender';
            this.fetchUrl = 'http://localhost:8080/messages/inbox';
        } else if (this.props.folderType === 'OUTBOX') {
            this.messagesTitle = 'Sent';
            this.senderOrReceiver = 'Receiver';
            this.fetchUrl = 'http://localhost:8080/messages/sent';
        } else {
            console.error('Unknown messages folder type');
        }
    }

    static contextType = UserContext;

    // handle passed to PaginationFooter child
    setActivePage(newActivePage) {
        console.log('Current page before change', this.state.currentPage);
        console.log('Active Page passed as param', newActivePage);
        this.setState({
            currentPage: newActivePage,
        }, () => this.fetchPageMessages());
        // setState is asynchronous
        // We had to update messages with callback to make sure they get updated AFTER the value of the current page has been set
    }

    // handle passed to PaginationHeader child
    setMessagesPerPage(option) {
        // We check if after the update we have at least the same number of pages in order to remain at the same
        // if (option > this.state.messagesPerPage) {
        //     let lastPageMessagesAfterUpdate = this.state.totalMessages % option;
        //     let totalPagesAfterUpdate = ((this.state.totalMessages - lastPageMessagesAfterUpdate) / option) + 1;
        //     if (totalPagesAfterUpdate < this.state.currentPage) {
        //         this.setState({
        //             messagesPerPage: option,
        //             currentPage: totalPagesAfterUpdate
        //         } , () => this.fetchPageMessages());
        //     }
        // } else // otherwise we just update and remain at the same pagenumber as before
        // this.setState({
        //     messagesPerPage: option
        // } , () => this.fetchPageMessages());

        // we could also just reset the currentPage to the first one after each update and
        // this seems better and simpler for the time being
        this.setState({
            currentPage: 1,
            messagesPerPage: option
        }, () => this.fetchPageMessages());
    }

    // fetches messages based on current state
    fetchPageMessages() {
        const startIndex = (this.state.currentPage - 1) * this.state.messagesPerPage;
        const url = this.fetchUrl + '?start=' + startIndex + '&size=' + this.state.messagesPerPage;
        console.log('url for messages fetch:', url);

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token,
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then( data => {
                console.log(data);
                console.log('Saving fetched messages to state');
                const lastPageMessages = data.count % this.state.messagesPerPage;
                const pagesNumber = (lastPageMessages > 0) ? (((data.count - lastPageMessages) / this.state.messagesPerPage) + 1) : (data.count / this.state.messagesPerPage);
                this.setState({
                    totalPages: pagesNumber,
                    totalMessages: data.count,
                    messages: data.results
                });
                console.log('Messages in state:', this.state.messages);
                })
            }
        }).catch(error => console.error('Error:', error));

        console.log('End of fetch');
    }

    componentDidMount() {
        console.log('Messages component did mount');
        this.fetchPageMessages();
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-light navbar-expand-md">
                    <div className="container col-sm pt-4 pb-0">
                        <ul className="navbar-nav mx-auto">
                            <li>
                                <ButtonLink label="INBOX" to="/messages" location={this.props.location.pathname} />
                            </li>
                            <li>
                                <span className="col-1"> </span>
                            </li>
                            <li>
                                <ButtonLink label="SENT" to="/messages/out" location={this.props.location.pathname} />
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container py-3 text-center">
                    <h2>{this.messagesTitle} Messages</h2>
                </div>

                <PaginationHeader count={this.state.totalMessages} options={this.messagesPerPageOptions} activeOption={this.state.messagesPerPage} handle={this.setMessagesPerPage} />

                <div className="container">
                    <div className="table-responsive-lg">
                        <table className="table table-striped table-borderless table-hover" id="messagesTable">
                            <thead>
                                <tr className="table-primary">
                                    <th>#</th>
                                    <th>{this.senderOrReceiver}</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.messages.map((m, index) => {
                                    console.log('Updating li for message ' + index);
                                    return <MessageRow key={'mk_' + m.id} msg={m} folderType={this.props.folderType} i={((this.state.currentPage - 1) * this.state.messagesPerPage) + (index + 1)}></MessageRow>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <PaginationFooter activePage={this.state.currentPage} totalPages={this.state.totalPages} handle={this.setActivePage} />
            </React.Fragment>
        );
    }

}

// parent components handle authorization
export default withRouter(Messages);