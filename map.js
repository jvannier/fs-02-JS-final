function displayMap() {
    navigator.geolocation.getCurrentPosition(showPosition)
}

function showPosition(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude;

    // building map
    const map = L.map('map', {
        center: [lat, long],
        zoom: 15,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    // display marker by the user's cord
    L.marker([lat, long]).addTo(map).bindPopup("My location")
    // shows the proximity of 2500 of users location if the user wants
    L.control.locate().addTo(map)


    async function getFoursquare(business) {
        let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
        let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
        let limit = 5
        let response = await fetch(
            `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${long}&query=${business}`
        )
        let data = await response.json()
        let items = data.response.groups[0].items

        for (let index = 0; index < limit; index++) {
            console.log(items[index])
            L.marker([items[index].venue.location.lat, items[index].venue.location.lng]).addTo(map).bindPopup(`${items[index].venue.name}`)

        }
    }

    document.getElementById('find').addEventListener('click', () => {
        let business = document.getElementById("selections").value
        getFoursquare(business)
    })
}

// create map
displayMap()