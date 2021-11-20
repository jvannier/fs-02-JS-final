function displayMap() {
    navigator.geolocation.getCurrentPosition(showPosition)
}

function showPosition(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude;

    const map = L.map('map', {
        center: [lat, long],
        zoom: 15,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    L.marker([lat, long]).addTo(map).bindPopup("My location")
    L.control.locate().addTo(map)


    async function getFoursquare(business) {
        let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
        let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
        let limit = 5
        let lat = map.coordinates[0]
        let lon = map.coordinates[1]
        let response = await fetch(
            `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
        );
        let data = await response.json()
        console.log(data)
    }


}

// create map
displayMap()









// create and main add geolocation marker
// window.onload = async () => {
//     const coords = await getCoords()
//     L.marker([coords[0], coords[1]])
// }
// const marker = L.marker([40.0583, -74.4057])
// marker.addTo(myMap).bindPopup('<p1><b>RANDOM LOCATION</b></p1>').openPopup()