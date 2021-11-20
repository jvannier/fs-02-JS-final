
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},

    buildMap() {
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 10,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://rwww.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '10',
        }).addTo(this.map)
        const marker = L.marker(this.coordinates)
        marker
            .addTo(this.map)
            .bindPopup('<p1><b>This is you</b><br></p1>')
            .openPopup()
    },

    addMarkers() {
        for (var i = 0; i < this.businesses.length; i++) {
            this.markers = L.marker([
                this.businesses[i].lat,
                this.businesses[i].long,
            ])
                .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
                .addTo(this.map)
        }
    },
}

async function getFoursquare(business) {
    let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
    let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
    let limit = 5
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]
    let response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
    );
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.response.groups[0].items
    return businesses
}


function searchBusinesses(data) {
    let businesses = data.map((element) => {
        let location = {
            name: element.venue.name,
            lat: element.venue.location.lat,
            long: element.venue.location.lng,
        };
        return location
    })
    return businesses
}
document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    let business = document.getElementById('business').value;
    let data = await getFoursquare(business)
    myMap.businesses = searchBusinesses(data)
    myMap.addMarkers()
})
window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.buildMap()
}
