import React, { Component } from 'react';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../Role';

class LandingMainSearch extends Component {

    constructor(props) {
        super(props);
        this.area = React.createRef();
        this.trainingType = React.createRef();
        this.state = {
            areas: [],
            trainingTypes: []
        };
        this.fetchAreas = this.fetchAreas.bind(this);
        this.fetchTrainingTypes = this.fetchTrainingTypes.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // We get areas and trainingTypes to populate our state
    componentDidMount() {
        console.log('Search component did mount');
        this.fetchAreas();
        this.fetchTrainingTypes();       
    }

    fetchAreas() {
        const url = 'http://localhost:8080/find/...';

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
                'Accept': 'application/json',
            }
        }).then(response => {
            response.json().then(data => {
                console.log('Response status:', response.status);
                console.log(data);
                // if (response.status === 200) {
                console.log('Saving fetched areas to state');
                this.setState({
                    areas: data.areas
                });
                console.log('Areas in state:', this.state.areas);
                // }
            })
        }).catch(error => console.error('Error:', error));

        console.log('End of fetch areas');
    }

    fetchTrainingTypes() {
        const url = 'http://localhost:8080/find/...';

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': localStorage.getItem('token'),
                'Accept': 'application/json',
            }
        }).then(response => {
            response.json().then(data => {
                console.log('Response status:', response.status);
                console.log(data);
                // if (response.status === 200) {
                console.log('Saving fetched training types to state');
                this.setState({
                    trainingTypes: data.trainingTypes
                });
                console.log('Areas in state:', this.state.areas);
                // }
            })
        }).catch(error => console.error('Error:', error));

        console.log('End of fetch training types');
    }   

    handleSearch(event) {
        const url = 'http://localhost:8080/find/...';
        const formData = {
            "area": this.area.current.value,
            "trainingType": this.trainingType.current.value
        };

        console.log('Getting results for...', formData);

        // fetch(url, {
        //     method: 'GET',
        //     body: JSON.stringify(formData),
        // }).then((response) => {
        //     console.log('Sent. Response status:', response.status);
        //     // Redirect somewhere with success message alert or whatever
        // }).catch(error => console.error('Error:', error));

        event.preventDefault();
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
                <input list="areas" id="area" className="form-control form-control-lg mr-0 col-sm-5 custom-form" placeholder="&#8597; Choose area" ref={this.area}/>
                <datalist id="areas">
                    <option value="Glifada" />
                    <option value="Voula" />
                    <option value="Kallithea" />
                    <option value="Pagkrati" />
                    <option value="Nikaia" />
                    <option value="Aigaleo" />
                </datalist>
                <input list="training-types" id="training-type" className="form-control form-control-lg mr-0 col-sm-5 custom-form" placeholder="&#8597; Or choose workout style " ref={this.trainingType}/>
                <datalist id="training-types">
                    <option value="Running" />
                    <option value="Boxing" />
                    <option value="Weights" />
                </datalist>
                <button className="btn btn-primary btn-lg col-sm-2" type="submit">Search</button>
            </form>
        );
    }

}

// We only want logged in users to be able to search for trainers
export default withAuthorization(LandingMainSearch, [Role.User]);