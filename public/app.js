// 

const map1 = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// build leaflet map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
	},

	// add business markers
	addMarkers() {
		this.map.removeLayer(this.marker)
		for (var i = 0; i < this.businesses.length; i++) {
			
			this.markers = L.marker([
				this.businesses[i].lat,
				this.businesses[i].long,
				this.businesses[i].icon
			
		],{icon: myredPin})
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
	
	
}

	var myredPin = L.icon({
    iconUrl: 'assets/pin.png',
    iconSize: [38, 38],
    iconAnchor: [19, -38]})
    var userPin = L.icon({
		iconUrl: 'assets/red-pin.png',
		iconSize: [38, 38],
		iconAnchor: [19, -38],
});


// get coordinates via geolocation api
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// get foursquare businesses

async function getFoursquare(business) {
	let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
	let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
	let limit = 5
	let lat = map1 
.coordinates[0]
	let lon = map1 
.coordinates[1]
	let response = await fetch(
		`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
	);
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.response.groups[0].items
	return businesses
}

// process foursquare array
function processBusinesses(data) {
	
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

// event handlers
// window load
window.onload = async () => {
	const coords = await getCoords()
	map1 
.coordinates = coords
	map1 
.buildMap()
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()

	let business = document.getElementById('business').value;
	
	let data = await getFoursquare(business)
	map1 
.businesses = processBusinesses(data)

	map1 
.addMarkers()

})