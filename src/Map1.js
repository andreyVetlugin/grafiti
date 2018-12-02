import {bindActionCreators, compose} from "redux"
import {withProps, withStateHandlers} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"


render() {

    const {data} = this.props

    const marketState = withStateHandlers({
        isOpen: false
    }, {
        onMarkerClick: ({isOpen}) => () => ({isOpen: !isOpen})
    })


    // This is the key!
    const MarkerPoint = compose(marketState)(props =>

        <Marker key={props.marker.input_session}
                position={{lat: props.marker.lat, lng: props.marker.lng}}
                onClick={() => props.onMarkerClick()}>

            {props.isOpen &&
            <InfoWindow position={{lat: props.marker.lat, lng: props.marker.lng}}
                        onCloseClick={() => props.onMarkerClick()}>
                <h6>Data:{props.marker.input_session}</h6>
            </InfoWindow>
            }
        </Marker>
    )

    const MapWithMarkers = compose(withScriptjs, withGoogleMap)(props =>
        <GoogleMap key={props.data.name}
                   defaultZoom={18}
                   defaultCenter={{lat: props.data.values[0].lat, lng: props.data.values[0].lng}}>
            {
                props.data.values.map((marker) => {
                    return (<MarkerPoint marker={marker}/>)
                })
            }
        </GoogleMap>
    )

    return (
        <div>
            <MapWithMarkers
                data={this.props.data}
                googleMapURL="https://maps.googleapis.com/maps/api/....."
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}/>
        </div>
    )