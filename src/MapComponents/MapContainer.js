import React from 'react'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import PropTypes from 'prop-types';
import './Map.css';

export class MapContainer extends React.Component {

    componentDidUpdate(nextProps, nextState) {
        //eslint-disable-next-line
        let markerId = eval(this.props.marker);
        if(this.props !== nextProps && this.props.isClicked){
            this.getMarkerInfo(markerId.marker);
            this.animateMarker(markerId.marker);
        }else {
            return ;
        }
    }

    state = {
        place: '',
        street: '',
        contact: '',
        readMore: '',
        fullAdress: '',
        error: '',
        markers: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        animation: ''
    };

    onMarkerClick = (props, marker, e) =>{
        this.props.resetMarker();
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            mapCenter: props.position,
            animation: ""
        });
        this.getMarkerInfo(marker);
        this.animateMarker(marker);
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
        this.props.resetMarker();
    };

    animateMarker(marker) {
        const animation = this.props.google.maps.Animation.DROP
        marker.setAnimation(animation: animation);
    }

    getMarkerInfo(marker) {
        const self = this;

        // Add the api keys for foursquare
        const clientId = "3OZKHL4HY2NYLGV01RZTVIG1ROPX2CGHL4IMDAP0J0VHO41O";
        const clientSecret = "PNKCYTQETZHAL5XEDXIQPHVY0NGHREK3CDKAN53E4WPRU5SU";

        // Build the api endpoint
        const url =
            "https://api.foursquare.com/v2/venues/search?client_id=" +
            clientId +
            "&client_secret=" +
            clientSecret +
            "&v=20130815&ll=" +
            marker.getPosition().lat() +
            "," +
            marker.getPosition().lng() +
            "&limit=1";
        fetch(url)
            .then(function(response) {
                if (response.status !== 200) {
                    self.setState({
                        error: "Data loading failure",
                        readMore: ''
                    })
                    return;
                }
                // Get the text in the response
                response.json().then(function(data) {
                    let location_data = data.response.venues[0];
                    let place = location_data.name;
                    let street = location_data.location.formattedAddress[0];
                    let fullAdress = location_data.location.formattedAddress[1];
                    let contact = location_data.contact[0];
                    if (location_data.contact.phone)
                        contact = location_data.contact.phone;
                    let readMore ="https://foursquare.com/v/" + location_data.id;
                    self.setState({
                        place: place,
                        street:street,
                        contact: contact,
                        readMore: readMore,
                        fullAdress: fullAdress,
                        error: ""
                    });
                });
            })
            .catch(function(err) {
                self.setState({
                        error: "Data loading failure",
                        readMore: ''
                    })
            });
    }

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }
        const locations = this.props.locations;
        return (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={{
                    lat: 37.9756554,
                    lng: 23.7318121
                }}
                center={this.props.mapCenter}
                zoom={12}
                onClick={this.onMapClicked}
            >
                {locations.map((location) =>(
                    <Marker
                        ref={"marker"+location.id}
                        onClick={this.onMarkerClick}
                        name={location.title}
                        position={location.pos}
                        key={location.id}
                        mapTypeControl= {false}
                    />
                ))}
                {this.props.isClicked ?
                    <InfoWindow
                    //eslint-disable-next-line
                    marker={eval(this.props.marker).marker}
                    visible={this.props.showingInfoWindow}
                >
                    <div className="infoWindow">
                        <h2>{this.state.error}</h2>
                        <h2>{this.state.place}</h2>
                        <h3>{this.state.street}</h3>
                        <h3>{this.state.fullAdress}</h3>
                        <a href={this.state.readMore} target="_blank">Read more on Foursquare</a>
                    </div>
                </InfoWindow>:
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div className="infoWindow">
                        <h2>{this.state.error}</h2>
                        <h2>{this.state.place}</h2>
                        <h3>{this.state.street}</h3>
                        <h3>{this.state.fullAdress}</h3>
                        <a href={this.state.readMore} target="_blank">Read more on Foursquare</a>
                    </div>
                </InfoWindow>}
            </Map>
        );
    }
}

MapContainer.propTypes = {
    activeMarker: PropTypes.object,
    selectedPlace: PropTypes.object,
    place: PropTypes.string,
    street: PropTypes.string,
    contact: PropTypes.string,
    readMore: PropTypes.string
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDy9ex5YAr6vI-2ziLFKq6FpFJzZyDoVIQ'
})(MapContainer)

