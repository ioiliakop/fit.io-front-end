import React, { Component } from 'react';

class TrainingSession extends Component {
    render() {
        return (
            <div class="container-fluid py-1">
                <div class="container">
                    <div className="row bg-light border">
                        <div className="col-lg-3 border-right text-center pt-5">
                            <img className="img-fluid" src="./img/sample_trainer_1_thumb.jpg" alt="Trainer 1" />
                        </div>
                        <div className="col-lg-3 pt-4 px-4 border-right">
                            <h4 className="text-primary">Anna Genadieva</h4>
                            <p>Yoga - Meditation</p>
                        </div>
                        <div className="col-lg-3 pt-4 px-4 border-right">
                            <p className="card-text"><i className="fas fa-wallet"></i> 25&euro;</p>
                            <p className="card-text"><i className="far fa-calendar-alt"></i> Tuesday 29/01/2019, 17:00</p>
                            <p className="card-text"><i className="fas fa-map-marked-alt"></i> Three Laloun 101, PETRALONA, ATTIKI</p>
                        </div>
                        <div className="col-lg-3 p-5">
                            <button type="button" className="btn btn-primary btn-block">CONTACT TRAINER</button>
                            <button type="button" className="btn btn-danger btn-block">CANCEL <i className="fas fa-ban"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrainingSession;