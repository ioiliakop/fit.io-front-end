import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonLink extends Component {
    render() {
        if (this.props.to === this.props.location) {
            return <Link className="btn btn-outline-primary active" role="button" to={this.props.to}>{this.props.label}</Link>
        }
        else {
            return <Link className="btn btn-outline-primary" role="button" to={this.props.to}>{this.props.label}</Link>
        }
    }
}

export default ButtonLink;