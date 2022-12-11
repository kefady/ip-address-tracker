import React from "react"
import { useEffect } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import MarkerIcon from "./MarkerIcon"

function LocationMarker({address}) {
  const position = [address.latitude, address.longitude]
	const map = useMap()
	useEffect(() => {
		map.flyTo(position, 15)
	})

  return position === null ? null : (
    <Marker icon={MarkerIcon} position={position}>
      <Popup>You are here.</Popup>
    </Marker>
  )
}

export default LocationMarker;