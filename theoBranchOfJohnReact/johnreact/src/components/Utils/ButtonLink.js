import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * General use ButtonLink that has style adjusted dynamically as active or not dependind on current location
 * 
 * Takes as props:
 * label -> text that will be rendered inside button body
 * to -> router location it will redirect
 * location -> current location
 * 
 * Maybe will be adjusted in the future to also set style/color dynamically through props
 */
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