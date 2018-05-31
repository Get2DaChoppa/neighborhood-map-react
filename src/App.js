import React from 'react';
import List from './List/List'
import MapContainer from './MapComponents/MapContainer'
import PropTypes from 'prop-types';
import './App.css';

class App extends React.Component {
    constructor(){
        super();
        this.state= {
            locations: require("./Data/locations.json"),
            search:'',
            clicked:'',
            filteredLocations: [],
            mapCenter: {},
            showingInfoWindow: false,
            selectedMarker: {},
            activeMarker: {},
            isClicked: false,
            marker:''
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.resetMarker = this.resetMarker.bind(this);
    }

    componentDidMount() {
        this.setState({
            filteredLocations : this.state.locations
        })
    }

//--------------Handles the input of the list's search bar--------------//
    searchHandler(event) {
        event.preventDefault()
        this.setState({
            search: event.target.value
        }, () => {this.filterLoc()})
    }

//-----Filters out the locations that don't match the search input------//
    filterLoc() {
        const locations = this.state.locations;
        const filteredLocations = locations.filter(
            (location) => {
                return location.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        this.setState({
            filteredLocations: filteredLocations
        });
    }

//---------Handles the the click event on the list's items------------//
    clickHandler(event) {
        event.preventDefault()
        this.setState({
            clicked: event.target.id
        },() => {this.selectLoc()})
    }

//---------Matches the clicked list item with its marker-----------//
    selectLoc() {
        const locations = this.state.locations;
        const selectedPlace = locations.filter(
            (location) => {
                return location.title.indexOf(this.state.clicked) !== -1;
            }
        )

        this.setState({
            mapCenter: selectedPlace[0].pos,
            loc: selectedPlace[0].pos
        });
        this.checkMarkers(selectedPlace[0].id);
    }

    checkMarkers = (id) => {
        let marker = "this.refs.marker"+id;
        this.setState({
            isClicked:true,
            marker: marker,
            showingInfoWindow: true
        })
    }

//---------------------Resets marker's state ---------------------//
    resetMarker(event) {
        this.setState({
            isClicked: false,
            marker: ""
        })
    }


    render() {
        const locations = this.state.filteredLocations;
        return (
            <div className="app-container" role="application">
                <header><h1>Restaurants</h1></header>
                <MapContainer
                    locations={locations}
                    selectedPlace={this.state.selectedPlace}
                    showingInfoWindow={this.state.showingInfoWindow}
                    activeMarker={this.state.activeMarker}
                    mapCenter={this.state.mapCenter}
                    isClicked={this.state.isClicked}
                    marker={this.state.marker}
                    resetMarker={this.resetMarker}
                />
                <List
                    locations={locations}
                    clickHandler={this.clickHandler}
                    searchHandler={this.searchHandler}
                    search={this.state.search}
                />
            </div>
        );
    }
}

App.propTypes = {
    search: PropTypes.string,
    clicked: PropTypes.string,
    filteredLocations: PropTypes.array,
    activeMarker: PropTypes.object,
    selectedPlace: PropTypes.object
}

export default App;

