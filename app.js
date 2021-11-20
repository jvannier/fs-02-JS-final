
const myMap = {
	currentLocation: [],
	businesses: [],
	map: {},
	markers: {},
	buildMap() {
		this.map = L.map('map', {
		center: this.currentLocation,
		zoom: 11,
		});
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		const marker = L.marker(this.currentLocation,{icon:myIcon})
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>This is You</b><br></p1>')
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
var myIcon = L.icon({
	iconUrl: 'redpin.png',
	iconSize: [38,38],
	iconAnchor: [19,38],


});



async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

async function getFoursquare(business) {
	let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
	let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
	let limit = 5
	let lat = myMap.currentLocation[0]
	let lon = myMap.currentLocation[1]
	let response = await fetch(
		`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
	);


	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.response.groups[0].items
	return businesses
}


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


window.onload = async () => {
	const coords = await getCoords()
	myMap.currentLocation = coords
	myMap.buildMap()
}

document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value;
	let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})



