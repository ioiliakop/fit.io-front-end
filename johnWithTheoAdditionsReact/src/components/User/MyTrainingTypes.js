import React, { Component } from 'react';
import UserContext from '../../context/user-context';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../../hoc/Role';

function TrainingTypeRow(props) {
    return (
        <tr>
            <th scope="row">{props.i}</th>
            <td>{props.trType.title}</td>
            <td><button type="button" className="btn btn-danger btn-sm" onClick={() => props.handle(props.trType.id)}>Remove</button></td>
        </tr>
    );
}

function TrainersAreaRow(props) {
    return (
        <tr>
            <th scope="row">{props.i}</th>
            <td>{props.trArea.city}</td>
            <td><button type="button" className="btn btn-danger btn-sm" onClick={() => props.handle(props.trArea.id)}>Remove</button></td>
        </tr>
    );
}

/**
 * The trainer component which gives him the ability to select/adjust:
 * - his training specialization
 * - areas where he trains
 * - price he charges
 */
class MyTrainingTypes extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.inputPrice = React.createRef();
        this.inputTrainingTypeId = React.createRef();
        this.inputTrainingAreaId = React.createRef();
        this.state = {
            price: '',
            allTrainingTypes: [],
            trainersTrainingTypes: [],
            allAreas: [],
            trainersAreas: []
        };
        this.fetchAllTrainingTypes = this.fetchAllTrainingTypes.bind(this);
        this.handleAddTrainingType = this.handleAddTrainingType.bind(this);
        this.handleRemoveTrainingType = this.handleRemoveTrainingType.bind(this);
        this.fetchAllAreas = this.fetchAllAreas.bind(this);
        this.fetchTrainersAreas = this.fetchTrainersAreas.bind(this);
        this.handleAddTrainersArea = this.handleAddTrainersArea.bind(this);
        this.handleRemoveTrainersArea = this.handleRemoveTrainersArea.bind(this);
        this.handleUpdateCost = this.handleUpdateCost.bind(this);
    }

    componentDidMount() {
        console.log('MyTrainingTypes component did mount');
        this.fetchAllTrainingTypes();
        this.fetchTrainersTrainingTypes();
        this.fetchAllAreas();
        this.fetchTrainersAreas();
        console.log('context:', this.context);
    }

    // fetches all areas from db to populate our datalist
    fetchAllAreas() {
        const url = 'http://localhost:8080/areas/all';

        fetch(url, {
            method: 'GET',
        }).then(response => {
            response.json().then(data => {
                console.log('Response status:', response.status);
                console.log('fetchAreas response data:', data);
                if (response.status === 200) {
                    console.log('Saving fetched areas to state');
                    this.setState({
                        allAreas: data
                    });
                    console.log('Areas in state:', this.state.allAreas);
                }
            })
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch areas');
    }

    fetchTrainersAreas() {
        const url = 'http://localhost:8080/areas/trainer-areas/' + this.context.userInfo.id;

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(trainersAreas => {
                    console.log('fetchTrainerAreas response data:', trainersAreas);
                    console.log('Saving fetched training areas to state');
                    this.setState({
                        trainersAreas: trainersAreas
                    });
                })
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch trainer areas');
    }

    handleAddTrainersArea() {
        const areaId = this.inputTrainingAreaId.current.value;
        const trainersAreasIdsOnlyList = this.state.trainersAreas.map((area, i) => { return area.id });

        // Check that input training area isn't already among trainer's areas
        // Only then we make ajax call, else no action is needed
        if ((areaId !== "") && !trainersAreasIdsOnlyList.includes(areaId)) {
            const url = 'http://localhost:8080/find/trainer-choose-area/' + areaId;
            console.log('Add area url:', url);

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-MSG-AUTH': this.context.token
                }
            }).then(response => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    console.log('Added area with id:', areaId);
                    this.fetchTrainersAreas();
                }
            }).catch(error => console.error('Error:', error));
            console.log('End of add training area');
        }
    }

    handleRemoveTrainersArea(areaId) {
        const url = 'http://localhost:8080/find/trainer-remove-area/' + areaId;
        console.log('Remove trainers area url:', url);

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': this.context.token
            }
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log('Removed training area with id:', areaId);
                this.fetchTrainersAreas();
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of remove training area');
    }

    // fetches all training types from db
    fetchAllTrainingTypes() {
        const url = 'http://localhost:8080/types/all';

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    console.log('fetchAllTrainingTypes response data:', data);
                    console.log('Saving fetched training types to state');
                    this.setState({
                        allTrainingTypes: data
                    });
                    console.log('All Training Types in state:', this.state.allTrainingTypes);
                })
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch all training types');
    }

    // fetches current trainer's training types
    fetchTrainersTrainingTypes() {
        const url = 'http://localhost:8080/types/trainer-types/' + this.context.userInfo.id;

        fetch(url, {
            method: 'GET',
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    console.log('fetchTrainersTrainingTypes response data:', data);
                    console.log('Saving fetched training types to state');
                    this.setState({
                        trainersTrainingTypes: data
                    });
                    console.log('Training Types in state:', this.state.trainersTrainingTypes);
                })
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch trainers training types');
    }

    handleUpdateCost() {
        const newCost = this.inputPrice.current.value;
        if ((newCost !== "") && (newCost !== this.context.userInfo.price)) {
            const url = 'http://localhost:8080/find/set-price/' + this.inputPrice.current.value;
            console.log('update cost url:', url);

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-MSG-AUTH': this.context.token
                }
            }).then(response => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    // We update user context with new info
                    console.log('Set new cost:', newCost);
                    let updatedUser = this.context.userInfo;
                    updatedUser.price = newCost;
                    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                    this.context.updateUserContext();
                    this.setState({ price: newCost });
                }
            }).catch(error => console.error('Error:', error));
            console.log('End of update cost');
        }
    }

    handleAddTrainingType() {
        const trId = this.inputTrainingTypeId.current.value;
        const trainersTypesIdsOnlyList = this.state.trainersTrainingTypes.map((tr, i) => { return tr.id });

        if ((trId !== "") && !trainersTypesIdsOnlyList.includes(trId)) {
            const url = 'http://localhost:8080/find/trainer-choose-type/' + trId;
            console.log('Add training type url:', url);

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-MSG-AUTH': this.context.token
                }
            }).then(response => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    console.log('Added training type with id:', trId);
                    this.fetchTrainersTrainingTypes();
                }
            }).catch(error => console.error('Error:', error));
            console.log('End of add training type');
        }
    }

    handleRemoveTrainingType(trainingTypeId) {
        const url = 'http://localhost:8080/find/trainer-remove-type/' + trainingTypeId;
        console.log('Remove training type url:', url);

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': this.context.token
            }
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log('Removed training type with id:', trainingTypeId);
                this.fetchTrainersTrainingTypes();
                console.log('All Training Types in state:', this.state.allTrainingTypes);
            }
        }).catch(error => console.error('Error:', error));
        console.log('End of remove training type');
    }

    render() {
        return (
            <div className="container py-3 mt-3 text-center" style={{ minHeight: '75vh' }}>
                <div className="col-12 mx-auto">
                    <div className="form-group col-md-4 mx-auto">
                        <label htmlFor="inputEmail"><h5>Cost (&euro;/hour)</h5></label>
                        <div className="input-group">
                            <input type="email" className="form-control" id="inputEmail" placeholder={this.context.userInfo.price} ref={this.inputPrice} />
                            <button type="button" className="btn btn-primary" onClick={this.handleUpdateCost}>Update</button>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="inputUsername"><h5></h5></label>
                            <div className="input-group">
                                <select className="custom-select" ref={this.inputTrainingTypeId}>
                                    <option value="">Choose Your Training Type</option>
                                    {this.state.allTrainingTypes.map((trainingType, index) => {
                                        return <option key={index} value={trainingType.id}>{trainingType.title}</option>
                                    })}
                                </select>
                                <button type="button" className="btn btn-primary" onClick={this.handleAddTrainingType}>Add</button>
                            </div>
                        </div>
                        <div className="col-2"></div>
                        <div className="form-group col-md-5">
                            <label htmlFor="inputUsername"><h5></h5></label>
                            <div className="input-group">
                                <select className="custom-select" ref={this.inputTrainingAreaId}>
                                    <option value="">Choose Your Area</option>
                                    {this.state.allAreas.map((area, index) => {
                                        return <option key={index} value={area.id}>{area.city}</option>
                                    })}
                                </select>
                                <button type="button" className="btn btn-primary" onClick={this.handleAddTrainersArea}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="row col-12 mt-3 mx-auto">
                        <table className="table table-sm table-hover col-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Your Training Types</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trainersTrainingTypes.map((trainingType, index) => {
                                    console.log('Updating li for message ' + index);
                                    return <TrainingTypeRow key={index} trType={trainingType} i={index + 1} trainerId={this.context.userInfo.id} handle={this.handleRemoveTrainingType} />
                                })}
                            </tbody>
                        </table>
                        <div className="col-2"></div>
                        <table className="table table-sm table-hover col-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Your Training Areas</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trainersAreas.map((trainersArea, index) => {
                                    console.log('Updating li for trainersArea ' + index);
                                    return <TrainersAreaRow key={index} trArea={trainersArea} i={index + 1} trainerId={this.context.userInfo.id} handle={this.handleRemoveTrainersArea} />
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }

}

export default withAuthorization(MyTrainingTypes, [Role.Trainer], true);