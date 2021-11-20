// GEOLOCATION
async function getCoords(){
	const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)});
	return [position.coords.latitude, position.coords.longitude]}

    // function(getIcon)  This was supposed to be a my custome marker icon! I got stuck on fetching the proper data from the server :( I just need to review it more - German Almonte

// MAP SETTINGS
const mapProject = {

    location: [],
    map: {},
    bplaces: [],
    markers: {},


    myMap(){
        this.map = L.map('map',{center: this.location, zoom:13,});
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: 
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',}).addTo(this.map) 
// YOUR MARKER 
const marker = L.marker(this.location) 
marker.addTo(this.map).bindPopup('Your Location').openPopup()
 },
//  BUSINESS MARKER
//  businessMarker() {
//     for (var i = 0; i < this.businesses.length; i++) {
//     this.markers = L.marker([
//         this.businesses[i].lat,
//         this.businesses[i].long,
//     ])
//         .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
//         .addTo(this.map)
//     }
// },
}
// FOURSQUARE BUSINESSES
async function fetchFSapi(business) {
    let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
    let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
    let limit = 5
    let lat = mapProject.location[0]
    let lon = mapProject.location[1]
    let response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`)
    let parsed = JSON.parse(data)
    let result = parsed.response.groups[0].items
    return result
    }
// CHANGING BUSINESSES
async function businesschange(){
    let locations = await fetchFSapi(document.getElementById('business').value)
    mapProject.bplaces = locations.map((loc) => 
    {return {
        title: loc.venue.name,
		x: loc.venue.location.lat,
		y: loc.venue.location.lon,
    }})
    mapProject.businessMarker()
}

// EVENT LISTENER FOR SUBMIT
// document.getElementById('submit').addEventListener('click', async (event) => {fetchFSapi()})

// LOADING
window.onload = async () => {
    const coordinates = await getCoords()
    console.log(coordinates)
    mapProject.location = coordinates
    mapProject.myMap()
}


// SCRAPBOOK
// GEOLOCATION
// if('geolocation' in navigator){
//     console.log('gelocation available');
//     navigator.geolocation.getCurrentPosition(position => {
//         lat = position.coords.latitude;
//         lon = position.coords.longitude;
//         console.log(lat,lon);
// // MAP SETTINGS
//     const mymap= 
//     L.map('mymap').setView([lat,lon],12);
//     L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=1xgd63ci94SJvWd2QEG8',{
//         attribution: 
//         '\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
//     }).addTo(mymap) 
// MARKER 
//     const marker = L.marker([lat,lon]).addTo(mymap).bindPopup('Your Location').openPopup();
//  })
// }else{
//     console.log('Location not available');
// }