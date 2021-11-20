// creating a map object
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

// build leaflet map
    buildMap() {
        this.map = L.map('map', {
        center: this.coordinates,
        zoom: 10,
        }),
// add openstreetmap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
        }).addTo(this.map)
// create and add geolocation marker for self
    const marker = L.marker(this.coordinates)
    marker.addTo(this.map).bindPopup('<p1><b>Me</b><br></p1>').openPopup()
    }
}
// adding business markers

// get coordinates via geolocation api 

// get foursquare businesses using REST GET method

// processig the foursquare array

// event handlers

// window load

// business submit button