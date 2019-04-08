import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

class TrainersNav extends Component {
    render() {
        return (
            <li className="nav-item">
                <Link className="nav-link" to="/trainers">Trainers</Link>
            </li>
        );
    }
}

export default withAuthorization(TrainersNav, Role.User);