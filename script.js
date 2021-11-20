// create map

//const { response } = require("express");

// Create map:                                                       
const myMap = L.map('map', {
    center: [48.868672, 2.342130],
    zoom: 12,
});


// Add OpenStreetMap tiles:
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
}).addTo(myMap)


// Get the user's coordinates:  
let loc
async function getCoords() {
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    loc = [pos.coords.latitude, pos.coords.longitude]

    return loc

}



// Create and add a geolocation marker:
let coord
navigator.geolocation.getCurrentPosition(function (location) {
    coord = new L.LatLng(location.coords.latitude, location.coords.longitude)
    console.log(coord)
    
    // Create and add a geolocation marker:
    const marker = L.marker(coord)
    marker.addTo(myMap).bindPopup('<p1><b>You are here</b></p1>').openPopup()
    return marker
});
let itemClicked

function getSelectedItem() {
    let itemHolder = document.getElementById('places');
    itemClicked = itemHolder.options[itemHolder.selectedIndex].value
    console.log(itemClicked)
}

async function getFoursquare(business) {

    let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
    let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
    let limit = 5
    let lat = coord.lat
    let lon = coord.lng

    let response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`

    );

    let data = await response.json()
    console.log(data)

}
getFoursquare(itemClicked)