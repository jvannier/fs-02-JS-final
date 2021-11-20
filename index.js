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
            .bindPopup('<p1><i>You are here</i></p1>')
            .openPopup()
    },

    // Business Markers
    addMarkers() {
        for (var i = 0; i < this.businesses.length; i++) {
            this.markers = L.marker([
                this.businesses[i].lat,
                this.businesses[i].long,
            ])
                .bindPopup("<p1>${this.businesses[i].name}<p1>")
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
    let clientId = "JBI5SJXGXHJUW4HZ3GQMYKPJ0XF04P01OERHSS403XKN2FHR"
    let clentSecret = "MXLUTR4MN55X0CKVUQK5ZBKDQ5DCM2MFQIQP31S3GGLM3YJP"
    let limit = 5
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]
    let response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`);
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.response.groups[0].items
    return businesses
}

// API execute
function executeBusinesses(data) {
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

// Get user location on page load
window.onload = async () => {
    const coords = await getCoordinates()
    myMap.coordinates = coords
    myMap.createMap()
}

// Button event listener
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)
})