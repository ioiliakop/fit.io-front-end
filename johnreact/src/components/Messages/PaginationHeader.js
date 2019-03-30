import React, { Component } from 'react';

function MessagesPerPageOption(props) {
    if (props.activeOption !== props.option)
        return (<a className="dropdown-item" href="#" onClick={() => props.setOption(props.option)}>{props.option}</a>)
    else
        return (
            <a className="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">{props.option}</a>
        );
}

class PaginationHeader extends Component {
    render() {
        return (
            <div className="container">
                <div className="row px-3">
                    <small className="text-muted">{this.props.count} messages</small>
                    <div className="dropdown ml-auto">
                        <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Messages Per Page
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {this.props.options.map((option, index) => {
                                return <MessagesPerPageOption key={index} option={option} activeOption={this.props.activeOption} setOption={this.props.handle} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaginationHeader;