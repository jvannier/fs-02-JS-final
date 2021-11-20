
// creating a map object
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

// build leaflet map
    buildMap() {
        this.map = L.map('map', {
        center: this.coordinates,
        zoom: 4,
        }),
    // add openstreetmap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '1',
        }).addTo(this.map)

    // Personalized icon
    let leafIcon = L.icon({
            iconUrl: 'leaf-green.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
    }),
        
    // create and add geolocation marker for self
    marker = L.marker(this.coordinates, {icon: leafIcon})
        marker.addTo(this.map).bindPopup('<p1><b>This is Me!</b><br></p1>').openPopup()
    },

    // adding business markers
    addMarkers(businesses) {
        for (let i = 0; i < businesses.length; i++) {
            // console.log(businesses[i].lat)
            // console.log(businesses[i].long)
        marker = L.marker([
            businesses[i].lat,
            businesses[i].long,
        ])
            .bindPopup(`<p1>${businesses[i].name}</p1>`)
            .addTo(this.map)
        }
    },
}
    // get coordinates via geolocation api 
    async function getCoords(){
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        });
        return [position.coords.latitude, position.coords.longitude]
    }

    // changed to mock.api
    async function getMockapi(business) {
        const options = {
        method: "GET",
        headers: { 
            "Content-Type": "application/json"
        }
        };
            let response = await fetch(`https://60d23844858b410017b2d60b.mockapi.io/places`, options)
            let data = await response.text()
            console.log(data)
            let parsedData = JSON.parse(data)
            let businesses = parsedData
            return businesses
    }
// // processing data from api
// function businessesData(data) {
// 	// let businesses = data.map(() => {
// 	// 	let location = {
// 	// 	name: element.name,
//     //     product: element.product

// 		};
// 		return location
// 	})
// 	return businesses
// }
function businessData(data){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let location = [{
            name: element.name,
            product: element.product,
            lat: element.latitude,
            long: element.longitude
    }]
        myMap.addMarkers(location)
        
    }
}
// window load
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// event handlers
// business submit button
document.getElementById('submit')
addEventListener('click', async (event) => {
	console.log("this is working");
	business = document.getElementById('business').value
	let data = await getMockapi(business)		
	event.preventDefault()
	businessData(data)
})

