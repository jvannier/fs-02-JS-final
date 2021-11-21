//Get user's coordinates
businesses = []
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}
// console.log(getCoords())


// Create map:                                                       
function buildMap() {
    const myMap = L.map('map', {
        center: [41.0978560377637, -74.15673717098873],
        zoom:15,
    });
    
    
    
    // Add OpenStreetMap tiles:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        
    }).addTo(myMap)  

    const marker = L.marker([41.0978560377637, -74.15673717098873]);

    marker
    .addTo(myMap)
    .bindPopup("<p1><b>You are here</b><br></p1>")
    .openPopup();

}

buildMap()


// Create and add a geolocation marker:


async function getFoursquare(business) {
	let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
	let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
	let limit = 5
	let lat = 41.0978560377637
	let lon = -74.15673717098873
	let response = await fetch(
		`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
	);
    console.log(response)
    let data = await response.json()
    let businesses = data.response.groups[0].items;
    return businesses
}   
getFoursquare('coffee')
          
getFoursquare('grocery')

getFoursquare('artstudios')
          
getFoursquare('musuems')

document.getElementById("submit").addEventListener('click', async function(e){
    e.preventDefault();  
    let business = document.getElementById('business').value;
    let data = await getFoursquare(business)
    businesses = process(data)
    addMarkers(businesses);
    console.log(businesses)
})

function process(businesses) {
    console.log(businesses)
for (let i =0; i<businesses.length; i++) {
    let location = {
        name: businesses[i].venue.name,
        lat:  businesses[i].location.lat,
        long: businesses[i].location.long,
    }
    return location;
}

}

const St = L.marker([],{icon: redPin}).bindPopup()
const Mu = L.marker([],{icon: redPin}).bindPopup()
const Gro = L.marker([],{icon: redPin}).bindPopup()
const ST = L.marker([],{icon: redPin}).bindPopup()
const Re= L.marker([],{icon: redPin}).bindPopup()
const Re= L.marker([],{icon: redPin}).bindPopup()

const stations = L.layerGroup([rS, sSD, sentier, bourse, qS, gB]).addTo(myMap)

function addMarkers(businesses) {
    for (var i = 0; i < this.businesses.length; i++) {
      this.markers = L.marker([this.businesses[i].lat, this.businesses[i].long])
        .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
        .addTo(this.map);
    }
  }
 


