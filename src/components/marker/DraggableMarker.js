import React, {useCallback, useMemo, useRef, useState} from "react";
import {Marker, Popup} from 'react-leaflet';

const center = [51.65635088095043, 39.19295310974122];


export function DraggableMarker(props) {
    const [draggable, setDraggable] = useState(true)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng());
                    props.onChange(marker.getLatLng())
                }
            },
        }),
        [],
    )

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            lat={position.lat}
            lng={position.lng}
            ref={markerRef}
            onChange={props.onChange}>
        </Marker>
    )
}

