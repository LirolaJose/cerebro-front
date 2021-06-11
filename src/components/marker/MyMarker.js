import React, {useState} from "react";
import {Marker} from "react-leaflet";


export function MyMarker(props) {
    const [position] = useState(props);

    return (
        <Marker
            draggable={false}
            position={position}
            lat={position.lat}
            lng={position.lng}>
        </Marker>
    )
}