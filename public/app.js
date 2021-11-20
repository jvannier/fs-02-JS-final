function buildMap() {
    var lon;
    var lat;

    // Initialize map
    var myMap = L.map('map').setView([0,0],5)

    // Retreive user location
    var x = document.getElementById("location");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
        }
    getLocation()

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
        lat = position.coords.latitude
        lon = position.coords.longitude

        myMap.setView([lat,lon],10) 
        
        
        // Add OpenStreetMap tiles:
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
        }).addTo(myMap)

        // Set "You Are Here" Marker
        let homeMarker = L.marker([lat, lon], )
        let popup = homeMarker.bindPopup('You are here').openPopup()
        popup.addTo(myMap)

        // Get user input and feed it into next function under first argument
        getUserInput()
        
        // Get nearby POI for selected choice. Return array of objects. 
        // Filter longitude and latitute for returned items into array and feed it to create markers function
        getFoursquare("coffee", lat, lon)
        

        // Set POI markers

        const test1 = L.marker([40.7898410, -74.1564290])
        const POI = L.layerGroup([test1]).addTo(myMap)
    }
    
    
}

// Get user dropdown input
function getUserInput() {
    let submissionBtn = document.getElementById("submitBtn")
    submissionBtn.addEventListener("click", () => {
        let userPOI = document.getElementById("poi").value
        console.log(userPOI)
    })
}

// Function for getting nearby POI
async function getFoursquare(business, lat, lon) {
        let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
        let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
        let limit = 5
        let response = await fetch(
            `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
        )
        let responseJSON = await response.json()
        console.log(responseJSON)
        let POI_lat = responseJSON.response.groups[0].items[0].venue.location.lat
        let POI_lon = responseJSON.response.groups[0].items[0].venue.location.lng
        console.log(POI_lat)
        console.log(POI_lon)
        // for (let i = 0; i < 5; i++) {
        //     let POI_lat = responseJSON.response.groups[i].items[i].venue.location.lat
        //     let POI_lon = responseJSON.response.groups[i].items[i].venue.location.lng
        //     console.log(POI_lat)
        //     console.log(POI_lon)
        // }
        
}

function createMarkers(POI_array) {

}

buildMap()



