import L from "leaflet"
import icon from "./../images/icon-location.svg"

export default L.icon({
	iconUrl: icon,
	iconSize: [32, 40],
	iconAnchor: [10, 41],
	popupAchor: [2, -40]
})