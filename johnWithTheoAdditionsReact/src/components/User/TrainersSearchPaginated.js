import React, { Component } from 'react';
import withAuthorization from '../../hoc/withAuthorization';
import Role from '../../hoc/Role';
import TrainerRow from './TrainerRow';
import PaginationHeader from '../Messages/PaginationHeader';
import PaginationFooter from '../Messages/PaginationFooter';

function SearchResults(props) {
    if (props.results) {
        return (
            props.results.map((trainer, index) => {
                return <TrainerRow key={index} trainer={trainer} />;
            })
        );
    }
}

class TrainersSearch extends Component {

    constructor(props) {
        super(props);
        this.inputArea = React.createRef();
        this.inputTrainingType = React.createRef();
        this.itemsPerPageOptions = [5, 10, 20];
        this.state = {
            areas: [],
            trainingTypes: [],
            searchResults: [],
            currentPage: 0,
            resultsPerPage: this.itemsPerPageOptions[0],
            numberOfTotalPages: 0,
            numberOfTotalResults: 0,
        };
        this.fetchAreas = this.fetchAreas.bind(this);
        this.fetchTrainingTypes = this.fetchTrainingTypes.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.validateInputArea = this.validateInputArea.bind(this);
        this.setActivePage = this.setActivePage.bind(this);
        this.setResultsPerPage = this.setResultsPerPage.bind(this);
        this.fetchPageResults = this.fetchPageResults.bind(this);
        this.fetchUrl = '';
    }

    // We get areas and trainingTypes from db to populate our state and our datalists
    componentDidMount() {
        console.log('Search component did mount');
        this.fetchAreas();
        this.fetchTrainingTypes();
    }

    // handle passed to PaginationFooter child
    setActivePage(newActivePage) {
        console.log('Current page before change', this.state.currentPage);
        console.log('Active Page passed as param', newActivePage);
        this.setState({
            currentPage: newActivePage - 1,
        }, () => this.fetchPageResults());
        // setState is asynchronous
        // We had to update messages with callback to make sure they get updated AFTER the value of the current page has been set
    }

    // handle passed to PaginationHeader child
    setResultsPerPage(option) {
        // we also reset the currentPage to the first one after each update
        this.setState({
            currentPage: 0,
            resultsPerPage: option
        }, () => this.fetchPageResults());
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
    // search by area only, training type only, or by area and type
    handleSearch(event) {
        // let url;
        if (this.inputTrainingType.current.value === "") {
            console.log('trainingType left empty');
            if (this.inputArea.current.value !== "") {
                console.log('area filled');
                let inputAreaId = this.validateInputArea();
                if (inputAreaId !== -1) {
                    this.fetchUrl = "http://localhost:8080/find/trainers-area/" + inputAreaId;
                }
            } else this.fetchUrl = "http://localhost:8080/find/all-trainers/2";
            // find all trainers url - this works with pagination - unimplemented atm
            // else url = "http://localhost:8080/find/all-trainers" + '?start=' + '0' + '&end=' + '100';
        } else if (this.inputArea.current.value === "") {
            this.fetchUrl = "http://localhost:8080/find/trainer-type/" + this.inputTrainingType.current.value;
        } else {
            let inputAreaId = this.validateInputArea();
            if (inputAreaId !== -1) {
                // this.fetchUrl = "http://localhost:8080/find/trainer2/" + this.inputTrainingType.current.value + "/" + inputAreaId + '?page=' + this.state.currentPage + '&size=' + this.state.resultsPerPage;
                this.fetchUrl = "http://localhost:8080/find/trainer/" + this.inputTrainingType.current.value + "/" + inputAreaId;
            }
        }

        console.log('Url to be used for search, before pagination options are appended:', this.fetchUrl);

        const formData = {
            "area": this.inputArea.current.value,
            "trainingType": this.inputTrainingType.current.value
        };

        console.log('Getting results for...', formData);

        // We go ahead with the ajax call only if validation above has produced a valid url
        if (this.fetchUrl) {
            this.fetchPageResults();
        }
        console.log('search results in state:', this.state.searchResults);
        // else handle respective notification prompt/alert
        event.preventDefault();
    }

    fetchPageResults() {
        console.log('fetch page results url:', this.fetchUrl);
        // We append pagination options here
        const finalUrl = this.fetchUrl + '?page=' + this.state.currentPage + '&size=' + this.state.resultsPerPage;
        fetch(finalUrl, {
            method: 'GET',
        }).then((response) => {
            console.log('Sent. Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    console.log('Saving fetched results to state');
                    const lastPageResults = data.count % this.state.resultsPerPage;
                    const pagesNumber = (lastPageResults > 0) ? (((data.count - lastPageResults) / this.state.resultsPerPage) + 1) : (data.count / this.state.resultsPerPage);
                    this.setState({
                        numberOfTotalPages: pagesNumber,
                        numberOfTotalResults: data.count,
                        searchResults: data.results
                    }, () => console.log('Results in state:', this.state.searchResults));
                })
            }
        }).catch(error => console.error('Error:', error));
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
            <React.Fragment>

                <div className="container my-4 py-5 mx-auto col-8">

                    {/* // datalist implementation */}
                    <form className="form-inline row justify-content-between" onSubmit={this.handleSearch}>
                        <input list="areas" className="form-control form-control-lg mr-0 col-sm-5 custom-form" placeholder="&#8597; Choose area" ref={this.inputArea} />
                        <datalist id="areas">
                            {this.state.areas.map((area, index) => {
                                return <option key={index} value={area.city} />;
                            })}
                        </datalist>
                        <select className="custom-select custom-select-lg form-control form-control-lg mr-0 col-sm-5" ref={this.inputTrainingType}>
                            <option value="">Or choose workout style</option>
                            {this.state.trainingTypes.map((trainingType, index) => {
                                return <option key={index} value={trainingType.id}>{trainingType.title}</option>
                            })}
                        </select>
                        <button className="btn btn-primary btn-lg col-sm-2" type="submit">Search</button>
                    </form>
                </div>

                <PaginationHeader count={this.state.numberOfTotalResults} options={this.itemsPerPageOptions} activeOption={this.state.resultsPerPage} handle={this.setResultsPerPage} />
                <SearchResults results={this.state.searchResults} />
                <PaginationFooter activePage={this.state.currentPage + 1} totalPages={this.state.numberOfTotalPages} handle={this.setActivePage} />

            </React.Fragment>
        );
    }

}

// We only want logged in users to be able to search for trainers
export default withAuthorization(TrainersSearch, [Role.Guest, Role.User], true);