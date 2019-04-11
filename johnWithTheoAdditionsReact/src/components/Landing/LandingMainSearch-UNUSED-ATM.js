import React, { Component } from 'react';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../../hoc/Role';

class LandingMainSearch extends Component {

    constructor(props) {
        super(props);
        this.inputArea = React.createRef();
        this.inputTrainingType = React.createRef();
        this.state = {
            areas: [],
            trainingTypes: []
        };
        this.fetchAreas = this.fetchAreas.bind(this);
        this.fetchTrainingTypes = this.fetchTrainingTypes.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // We get areas and trainingTypes to populate our state and our datalists
    componentDidMount() {
        console.log('Search component did mount');
        this.fetchAreas();
        this.fetchTrainingTypes();
    }

    // fetches all areas from db to populate our datalist
    fetchAreas() {
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
                        areas: data
                    });
                    console.log('Areas in state:', this.state.areas);
                }
            })
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch areas');
    }

    // fetches all training types from db
    fetchTrainingTypes() {
        const url = 'http://localhost:8080/types/all';

        fetch(url, {
            method: 'GET',
        }).then(response => {
            response.json().then(data => {
                console.log('Response status:', response.status);
                console.log('fetchTrainingTypes response data:', data);
                if (response.status === 200) {
                    console.log('Saving fetched training types to state');
                    this.setState({
                        trainingTypes: data
                    });
                    console.log('Training Types in state:', this.state.trainingTypes);
                }
            })
        }).catch(error => console.error('Error:', error));
        console.log('End of fetch training types');
    }

    // depending on input values we build the respective url for ajax call
    handleSearch(event) {
        let url;       
        if (this.inputTrainingType.current.value === "") {
            console.log('trainingType left empty');
            if (this.inputArea.current.value !== "") {
                console.log('area filled');
                let inputAreaId = this.validateInputArea();
                if (inputAreaId !== -1) {
                    url = "http://localhost:8080/find/trainers-area/" + inputAreaId;
                }
            }
            // else url = "get all trainers url";
        } else if (this.inputArea.current.value === "") {
            url = "http://localhost:8080/find/trainer-type/" + this.inputTrainingType.current.value;
        } else {
            let inputAreaId = this.validateInputArea();
            if (inputAreaId !== -1) {
                url = "http://localhost:8080/find/trainer/" + this.inputTrainingType.current.value + "/" + inputAreaId;
            }
        }

        console.log('Final url to be used for search:', url);

        const formData = {
            "area": this.inputArea.current.value,
            "trainingType": this.inputTrainingType.current.value
        };

        console.log('Getting results for...', formData);

        // We go ahead with the ajax call only if validation above has produced a valid url
        if (url) {
            fetch(url, {
                method: 'GET',
            }).then((response) => {
                console.log('Sent. Response status:', response.status);
                if (response.status === 200) {
                    response.json().then(trainersList => {
                        console.log(trainersList);
                    })
                }
                // Redirect somewhere with success message alert or whatever
            }).catch(error => console.error('Error:', error));
        }

        // else handle respective notification prompt/alert

        event.preventDefault();
    }

    // validates given input string against the list or areas in db (case insensitive)
    // returns the corresponding area id if valid, -1 otherwise
    validateInputArea() {
        let areaNamesList = this.state.areas.map((area, index) => {
            return area.city.toLowerCase();
        })
        if (areaNamesList.includes(this.inputArea.current.value.toLowerCase())) {
            console.log('Input area:', this.inputArea.current.value, ' is valid.');
            let i = areaNamesList.indexOf(this.inputArea.current.value.toLowerCase());
            console.log('Index of:', i);
            console.log('Area in state with that index:', this.state.areas[i]);
            return this.state.areas[i].id;
        } else {
            console.log('Input area :', this.inputArea.current.value, ' is NOT valid.');
            return -1;
        }
    }

    render() {
        return (
            // <form className="form-inline row justify-content-between">
            //     <input type="text" id="username" className="form-control form-control-lg mr-0 col-sm-5" placeholder="Choose area" />
            //     <input type="text" id="password" className="form-control form-control-lg mr-0 col-sm-5" placeholder="Or choose workout style" />
            //     <button className="btn btn-primary btn-lg col-sm-2" type="submit">Search</button>
            // </form>

            // datalist implementation
            <form className="form-inline row justify-content-between" onSubmit={this.handleSearch}>
                <input list="areas" className="form-control form-control-lg mr-0 col-sm-5 custom-form" placeholder="&#8597; Choose area" ref={this.inputArea} />
                <datalist id="areas">
                    {this.state.areas.map((area, index) => {
                        return <option key={index} value={area.city} />;
                    })}
                    {/* <option value="Glifada" />
                    <option value="Voula" />
                    <option value="Kallithea" />
                    <option value="Pagkrati" />
                    <option value="Nikaia" />
                    <option value="Aigaleo" /> */}
                </datalist>
                {/* <input list="training-types" className="form-control form-control-lg mr-0 col-sm-5 custom-form" placeholder="&#8597; Or choose workout style " ref={this.inputTrainingType}/> */}
                {/* <datalist id="training-types"> */}
                {/* {this.state.trainingTypes.map((trainingType, index) => { */}
                        {/* return <option key={index} value={trainingType.title} /> */}
                    {/* })} */}
                    {/* <option value="Running" />
                    <option value="Boxing" />
                    <option value="Weights" /> */}
                {/* </datalist> */}
                <select className="custom-select custom-select-lg form-control form-control-lg mr-0 col-sm-5" ref={this.inputTrainingType}>
                    <option value="">Or choose workout style</option>
                    {this.state.trainingTypes.map((trainingType, index) => {
                        return <option key={index} value={trainingType.id}>{trainingType.title}</option>
                    })}
                </select>
                <button className="btn btn-primary btn-lg col-sm-2" type="submit">Search</button>
            </form>
        );
    }

}

// We only want logged in users to be able to search for trainers
export default withAuthorization(LandingMainSearch, [Role.User]);