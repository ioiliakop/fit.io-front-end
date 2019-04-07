import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";

/**
 * Props needed
 * @param {Object} props.trainer
 */

class TrainerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainerAreas: [],
      trainerTypes: []
    };
  }

  componentDidMount() {
    this.fetchTrainerTypes();
    this.fetchTrainerAreas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.trainer.id !== prevProps.trainer.id) {
      this.fetchTrainerTypes();
      this.fetchTrainerAreas();
    }
  }

  fetchTrainerTypes() {
    const url =
      "http://localhost:8080/types/trainer-types/" + this.props.trainer.id;

    fetch(url, {
      method: "GET"
    })
      .then(response => {
        console.log(
          "fetchTrainerTypes for trainerId",
          this.props.trainer.id,
          "Response status:",
          response.status
        );
        if (response.status === 200) {
          response.json().then(trainerTypes => {
            console.log(
              "fetchTrainerTypes for trainerId",
              this.props.trainer.id,
              " response data:",
              trainerTypes
            );
            console.log("Saving fetched training types to state");
            this.setState({
              trainerTypes: trainerTypes
            });
          });
        }
      })
      .catch(error => console.error("Error:", error));
    console.log("End of fetch trainer types");
  }

  fetchTrainerAreas() {
    const url =
      "http://localhost:8080/areas/trainer-areas/" + this.props.trainer.id;

    fetch(url, {
      method: "GET"
    })
      .then(response => {
        console.log("Response status:", response.status);
        if (response.status === 200) {
          response.json().then(trainerAreas => {
            console.log("fetchTrainerAreas response data:", trainerAreas);
            console.log("Saving fetched training areas to state");
            this.setState({
              trainerAreas: trainerAreas
            });
          });
        }
      })
      .catch(error => console.error("Error:", error));
    console.log("End of fetch trainer areas");
  }

  render() {
    const trainerTypes = this.state.trainerTypes;
    const trainerAreas = this.state.trainerAreas;
    return (
      <div className="container-fluid py-1">
        <div className="container">
          <div className="row bg-light border">
            <div className="col-md-3 border-right text-center pt-5">
              <img
                className="img-fluid"
                src="./img/sample_trainer_1_thumb.jpg"
                alt="Trainer 1"
              />
            </div>
            <div className="col-md-3 pt-4 px-4 border-right text-center">
              <h4 className="text-primary">
                {this.props.trainer.firstName +
                  " " +
                  this.props.trainer.lastName}
              </h4>
              <p>
                {trainerTypes.map((trainerType, index) => {
                  return index < trainerTypes.length - 1
                    ? trainerType.title + " - "
                    : trainerType.title;
                })}
              </p>
            </div>
            <div className="col-md-3 pt-4 px-4 border-right">
              <p className="card-text">
                <FontAwesomeIcon icon="map-marked-alt" /> &nbsp;
                {trainerAreas.map((trainerArea, index) => {
                  return index < trainerAreas.length - 1
                    ? trainerArea.city + " - "
                    : trainerArea.city;
                })}
              </p>
              <p className="card-text">
                <FontAwesomeIcon icon="wallet" /> &nbsp;
                {this.props.trainer.price}&euro;
              </p>
            </div>
            <div className="col-lg-3 p-5">
              <Link
                to={`/trainerProfile/${this.props.trainer.id}`}
                className="btn btn-info btn-block"
              >
                PROFILE
              </Link>
              <button type="button" className="btn btn-warning btn-block">
                APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TrainerRow);
