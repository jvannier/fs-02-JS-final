
window.navigator.geolocation.getCurrentPosition(gotLocation);

function gotLocation(pos){
    var crd = pos.coords;
    let lat = crd.latitude;
    let long = crd.longitude;

    const myMap = L.map('map', {
        center: [lat, long],
        zoom: 0,
    });

    var redPin = L.icon({
        iconUrl: 'red-pin.png',
        iconSize: [38, 38],
        iconAnchor: [19, 1]
    });



    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap)

    var layerGroup = L.layerGroup().addTo(myMap);

    L.marker([lat, long],{icon: redPin}).addTo(myMap).bindPopup('<p1><b>Your Current Location</b></p1>').openPopup();

    //fetches data from API
    async function getFoursquare(business) {
                let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
                let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
                let limit = 5
                let response = await fetch(
                    `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${long}&query=${business}&limit=${limit}`
                )
                let locations = await response.json()
                
                for(let i=0; i < limit; i++){
                    L.marker([locations.response.groups[0].items[i].venue.location.lat, locations.response.groups[0].items[i].venue.location.lng]).addTo(layerGroup).bindPopup(`${locations.response.groups[0].items[i].venue.name}`);
                }
            }
            

    //event listeners
    document.getElementById("selectBusiness").addEventListener("click", getBusiness);
    function getBusiness(){
        let business = document.getElementById("place").value;

        // remove  markers from previous selection
        layerGroup.clearLayers();
        // create markers
        getFoursquare(business)
       
    }
    document.getElementById("clearSelection").addEventListener("click",()=>
    layerGroup.clearLayers());

}
