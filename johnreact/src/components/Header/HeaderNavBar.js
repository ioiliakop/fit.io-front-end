import React, { Component } from 'react';

class HeaderNavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top py-4">
                <div className="container">
                    <a className="navbar-brand" href="/"><i className="fas fa-running"></i> <strong>fit.io</strong></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                        {this.props.children}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default HeaderNavBar;