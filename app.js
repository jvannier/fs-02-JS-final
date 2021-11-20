/**
const map = {

    get location with leaflet api's .locate function
    parse location in marker object for map
    on change of busiess type 
        call foursquare api
    parse foursquare api results into markers
} 
*/

function getIcon(businessType){
    if (businessType=='user'){
        return 'marker.png'
    }
    if (businessType=='restaurant'){
        return 'restaurant.jpg'
    }
    if (businessType=='hotel'){
        return 'hotel.png'
    }
    if (businessType=='market'){
        return 'markets.png'
    }
    if (businessType=='coffee'){
        return 'coffee.jpg'
    }
}
function getIconConfig(businessType){
    return L.icon({
        iconUrl: getIcon(businessType),
        iconSize:     [45, 45],
        iconAnchor:   [20, 50],
        popupAnchor:  [0, -76]
    });
}


async function getCoords(){
	const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [position.coords.latitude, position.coords.longitude]
}

const mapObj = {

    currentLocation: [],
    markers: {},
    map: {},
    businessLocations: [],
    initializeMap() {
        
        this.map = L.map('map', {
            center: this.currentLocation,
            zoom: 15,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '5',
        }).addTo(this.map)
        const marker = L.marker(this.currentLocation , {icon: getIconConfig('user')})
        marker.addTo(this.map).bindPopup('<p1><b>You are here</b><br></p1>').openPopup()
    } ,
    parseMarkers(){
        for(let loc of this.businessLocations){
            this.markers = L.marker([
                loc.x,
                loc.y,
            ], {icon: getIconConfig(document.getElementById('businessType').value)})
            .bindPopup(`<p1><b>${loc.title}</b></p1>`)
            .addTo(this.map)

        }
    }

}

// function parseFoursquareData
async function parseFoursquareData(businessType){
    let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
	let clientSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
	let limit = 5
    let url = `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=${limit}&ll=${mapObj.currentLocation[0]},${mapObj.currentLocation[1]}&query=${businessType}`
    let response = await fetch(url);
    let data = await response.text()
	let parsed = JSON.parse(data)
	let result = parsed.response.groups[0].items
	return result
}

async function onChangeOfBusinessType(){
    let locations = await parseFoursquareData(document.getElementById('businessType').value)
    mapObj.businessLocations = locations.map((loc) => {return {
        title: loc.venue.name,
		x: loc.venue.location.lat,
		y: loc.venue.location.lng,
    }})
    mapObj.parseMarkers()
}

document.getElementById('submit').addEventListener('click', async (event) => {
    onChangeOfBusinessType()
})


window.onload = async () => {
    const coordinates = await getCoords()
    console.log(coordinates)
    mapObj.currentLocation = coordinates
    mapObj.initializeMap()
}

