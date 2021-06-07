import React, {useCallback, useMemo, useRef, useState} from "react";
import {Marker, Popup} from 'react-leaflet';
import L from "leaflet";
import markerIcon from "./new_advertisement/marker-icon.png";


const center = [51.65635088095043, 39.19295310974122];

const icon = new L.icon({
    iconUrl: markerIcon,
    iconSize: [30, 30]
});

export function DraggableMarker() {
    const [draggable, setDraggable] = useState(true)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={icon}>
            <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
        </span>
            </Popup>
        </Marker>
    )
}

