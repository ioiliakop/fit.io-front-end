import React, { Component } from 'react';
import LandingMain from "./Landing/LandingMain";
import ThreeSteps from "./Landing/ThreeSteps";
import ReadyToGetStarted from "./Landing/ReadyToGetStarted";

class Landing extends Component {
    render() {
        return (
            <React.Fragment>
                <LandingMain />
                <ThreeSteps />
                <ReadyToGetStarted />
            </React.Fragment>
        );
    }
}

export default Landing;