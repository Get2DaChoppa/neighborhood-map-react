import React from 'react';
import List from './List/List'
import MapContainer from './MapComponents/MapContainer'
import PropTypes from 'prop-types';
import './App.css';

class App extends React.Component {
    constructor(){
        super();
        this.state= {
            locations : [
                {
                title:"Mind The Cup",
                pos:{lat:38.0115728, lng:23.6932724},
                id:1,
                showInfoWindow:false
                },
                {
                title:"Juicy Grill",
                pos:{lat:37.9987607,lng:23.8000526},
                id:2,
                showInfoWindow:false
                },
                {
                title:"Sushimou",
                pos:{lat:37.9744241,lng:23.7324616},
                id:3,
                showInfoWindow:false
                },
                {
                title:"Colibri",
                pos:{lat:37.9663405,lng:23.742766},
                id:4,
                showInfoWindow:false
                },
                {
                title:"Mirch",
                pos:{lat:37.9769771,lng:23.7236935},
                id:5,
                showInfoWindow:false
                }
            ],
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

    componentDidMount(marker) {
        this.showmarker(marker);
        this.setState({
            filteredLocations : this.state.locations
        })
    }

    showmarker(marker) {
        console.log(marker)
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
                return location.title.toLowerCase().indexOf(this.state.search) !== -1;
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

//---------****************!!!!!!!!!!!!!*****************------------//
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

    resetMarker(event) {
        this.setState({
            isClicked: false,
            marker: ""
        })
    }


    render() {
        const locations = this.state.filteredLocations;
        return (
            <div className="app-container">
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

