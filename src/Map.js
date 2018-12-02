/*global google*/
import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";


const MyMapComponent = compose(    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh`,marginTop:'0vh' }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)((props)=>
    (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: 56.838607, lng: 60.605514}}
            onClick={(e) =>props.handleMapClick(e)}
        >
            {props.markers}
        </GoogleMap>));

class Map extends React.PureComponent {

    render() {
        var onMarkerClick=this.props.onMarkerClick;
        var markers=this.props.grafiti.map(function(e){
            return(
                <MarkerWithLabel position={{ lat: e.lat, lng:e.lng}}
                    labelAnchor={new google.maps.Point(0, 0)}
                    labelStyle={e.image==null?{backgroundColor: "white", fontSize: "15px", padding: "1px" ,margin:"0"}:null}
                    onClick={onMarkerClick}
                >
                    <div>
                    {e.image!=null ? <img style={{width:50,height:50}} src={e.image}/>:null}
                    {e.image==null? e.title:null}
                    </div>
                </MarkerWithLabel>
                )}
            );
        return <MyMapComponent handleMapClick={this.props.handleMapClick} markers={markers}/>
    }
}
export default Map;