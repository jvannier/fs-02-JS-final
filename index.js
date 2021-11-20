// Map object                                                      
const myMap =  {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},

    // Create map using leaflet
    createMap() {
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 10,
        });
        // OpenStreams
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '15',
        }).addTo(this.map)
        // User Location
        const marker = L.marker(this.coordinates)
        marker.addTo(this.map)
            .bindPopup('<p><i>You are here</i></p>')
            .openPopup()
    },

    // Business Markers
    addMarkers() {
        console.log(this.businesses)
        for (var i = 0; i < this.businesses.length; i++) {
            this.markers = L.marker([
                this.businesses[i].lat,
                this.businesses[i].lon,
            ])
                .bindPopup(`<p>${this.businesses[i].name}<p>`)
                .addTo(this.map)
        }
    },
}

// Get user location
async function getCoordinates(businesses) {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}
// 

// API get
async function getBusinesses(business) {
    let clientId = "3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34";
    let clentSecret = "IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU";  
    let limit = 5
    let lat = myMap.coordinates[0]
    console.log(lat)
    let lon = myMap.coordinates[1]
    console.log(lon)
    let response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`);
    let data = await response.text()
    console.log(data)
    let parsedData = JSON.parse(data)
    console.log(parsedData)
    let businesses = parsedData.response.groups[0].items

    return businesses
}

// API execute
async function executeBusinesses(data) {
    let businesses = data.map((element) => {
        let location = {
            name: element.venue.name,
            lat: element.venue.location.lat,
            lon: element.venue.location.lon,
        };
        return location
    })
    return businesses
}

// Get user location on page load
window.onload = async () => {
    const coords = await getCoordinates()
    myMap.coordinates = coords
    myMap.createMap()
}

// Button event listener
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault();
	let business = document.getElementById('business').value;
	let data = await getBusinesses(business)
	myMap.businesses = executeBusinesses(data)
	myMap.addMarkers()
})