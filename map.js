// create map
const myMap = L.map('map', {
    center: [40.0583, -74.4057],
    zoom: 12,
});

// add openstreetmap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap)

// create and main add geolocation marker
const marker = L.marker([40.0583, -74.4057])
marker.addTo(myMap).bindPopup('<p1><b>RANDOM LOCATION</b></p1>').openPopup()