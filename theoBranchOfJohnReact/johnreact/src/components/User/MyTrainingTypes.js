import React, { Component } from 'react';
import UserContext from '../../context/user-context';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

function TrainingTypeRow(props) {
    return (
        <tr>
            <th scope="row">{props.i}</th>
            <td>{props.trType.title}</td>
            <td><button type="button" className="btn btn-danger btn-sm" onClick={() => props.handle(props.trType.id)}>Remove</button></td>
        </tr>
    );
}

class MyTrainingTypes extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.inputPrice = React.createRef();
        this.inputTrainingTypeId = React.createRef();
        this.state = {
            price: '',
            allTrainingTypes: [],
            trainersTrainingTypes: []
        };
        this.fetchAllTrainingTypes = this.fetchAllTrainingTypes.bind(this);
        this.handleAddTrainingType = this.handleAddTrainingType.bind(this);
        this.handleRemoveTrainingType = this.handleRemoveTrainingType.bind(this);
        this.handleUpdateCost = this.handleUpdateCost.bind(this);
    }

    componentDidMount() {
        console.log('MyTrainingTypes component did mount');
        this.fetchAllTrainingTypes();
        this.fetchTrainersTrainingTypes();
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

    // TODO: properly update placeholder. Maybe revisit state
    handleUpdateCost() {
        const newCost = this.inputPrice.current.value;
        if ((newCost !== "") && (newCost !== this.context.userInfo.price)) {
            const url = 'http://localhost:8080/find/set-price/' + this.context.userInfo.id + '/' + this.inputPrice.current.value;
            console.log('update cost url:', url);

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-MSG-AUTH': localStorage.getItem('token'),
                }
            }).then(response => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    console.log('Set new cost:', newCost);
                }
            }).catch(error => console.error('Error:', error));
            console.log('End of update cost');
        }
    }

    handleAddTrainingType() {
        const trId = this.inputTrainingTypeId.current.value;
        const trainersTypesIdsOnlyList = this.state.trainersTrainingTypes.map((tr, i) => { return tr.id });

        if ((trId !== "") && !trainersTypesIdsOnlyList.includes(trId)) {
            const url = 'http://localhost:8080/find/trainer-choose-type/' + this.context.userInfo.id + '/' + trId;
            console.log('Remove training type url:', url);

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-MSG-AUTH': localStorage.getItem('token'),
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
        const url = 'http://localhost:8080/find/trainer-remove-type/' + this.context.userInfo.id + '/' + trainingTypeId;
        console.log('Remove training type url:', url);

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
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
            <div className="container py-3 my-3 text-center">
                <div className="col-10 mx-auto">
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="inputUsername"><h5>Training Types</h5></label>
                            <div className="input-group">
                                <select className="custom-select" ref={this.inputTrainingTypeId}>
                                    <option value="">Choose Training Type</option>
                                    {this.state.allTrainingTypes.map((trainingType, index) => {
                                        return <option key={index} value={trainingType.id}>{trainingType.title}</option>
                                    })}
                                </select>
                                <button type="button" className="btn btn-primary" onClick={this.handleAddTrainingType}>Add</button>
                            </div>
                        </div>
                        <div className="col-2"></div>
                        <div className="form-group col-md-5">
                            <label htmlFor="inputEmail"><h5>Cost (&euro;/hour)</h5></label>
                            <div className="input-group">
                                <input type="email" className="form-control" id="inputEmail" placeholder={this.context.userInfo.price} ref={this.inputPrice} />
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateCost}>Update</button>
                            </div>
                        </div>
                    </div>
                    <div className="row col-8 mt-5">
                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Your Training Types</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trainersTrainingTypes.map((trainingType, index) => {
                                    console.log('Updating li for message ' + index);
                                    return <TrainingTypeRow key={index} trType={trainingType} i={index + 1} trainerId={this.context.userInfo.id} handle={this.handleRemoveTrainingType} />
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