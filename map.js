// async function getCoords(){
//     pos = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
//     return [pos.coords.latitude, pos.coords.longitude]
// }


// create map
const map = L.map('map', {
    center: [40.0583, -74.4057],
    zoom: 12,
});

// add openstreetmap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)
map.locate({setView: true, maxZoom: 16});


// create and main add geolocation marker
// window.onload = async () => {
//     const coords = await getCoords()
//     L.marker([coords[0], coords[1]])
// }
// const marker = L.marker([40.0583, -74.4057])
// marker.addTo(myMap).bindPopup('<p1><b>RANDOM LOCATION</b></p1>').openPopup()