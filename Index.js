// Search Bar, result list and Map
const searchInput = document.getElementById('search');
const resultList = document.getElementById('result-list');
const mapContainer = document.getElementById('map-container');
const currentMarkers = [];



const myMap = L.map(mapContainer).setView([20.13847, 1.40625], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

document.getElementById('search-button').addEventListener('click', () => {
    const query = searchInput.value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
        .then(result => result.json())
        .then(parsedResult => {
            setResultList(parsedResult);
        });
});


// OSM Layers
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
}).addTo(myMap)

// Geolocation marker
const marker = L.marker([48.87007, 2.346453])
marker.addTo(myMap).bindPopup('<p1><b>The Hoxton, Paris</b></p1>').openPopup()

// 2nd arrondissement
const latlngs = [[48.863368120198004, 2.3509079846928516],[48.86933262048345, 2.3542531602919805],[48.87199261164275, 2.3400569901592183],[48.86993336274516, 2.3280142476578813], [48.86834104280146, 2.330308418109664]]

const polygon = L.polygon(latlngs, {
    color: 'blue', 
    fillOpacity: 0.0
}).addTo(myMap)

//  Red pin marker
const redPin = L.icon({
    iconUrl: 'red-pin.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -38] // point from which the popup should open relative to the iconAnchor
});

// metro station markers
const rS = L.marker([48.866200610611926, 2.352236247419453],{icon: redPin}).bindPopup('Réaumur-Sébastopol')
const sSD = L.marker([48.869531786321566, 2.3528590208055196],{icon: redPin}).bindPopup('Strasbourg-Saint-Denis')
const sentier = L.marker([48.8673721067762, 2.347107922912739],{icon: redPin}).bindPopup('Sentier')
const bourse = L.marker([48.86868503971672, 2.3412285142058167],{icon: redPin}).bindPopup('Bourse')
const qS = L.marker([48.869560129483226, 2.3358638645569543],{icon: redPin}).bindPopup('Quatre Septembre')
const gB = L.marker([48.871282159004856, 2.3434818588892714],{icon: redPin}).bindPopup('Grands Boulevards')

const stations = L.layerGroup([rS, sSD, sentier, bourse, qS, gB]).addTo(myMap);

//Map Display / Remove results / Event Listener to location
function setResultList(parsedResult) {
    resultList.innerHTML = "";
    for (const marker of currentMarkers) {
        myMap.removeLayer(marker);
    }
    myMap.flyTo(new L.LatLng(20.13847, 1.40625), 2);
    for (const result of parsedResult) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-action');
        li.innerHTML = JSON.stringify({
            displayName: result.display_name,
            lat: result.lat,
            lon: result.lon
        }, undefined, 2);
        li.addEventListener('click', (event) => {
            for(const child of resultList.children) {
                child.classList.remove('active');
            }
            event.target.classList.add('active');
            const clickedData = JSON.parse(event.target.innerHTML);
            const position = new L.LatLng(clickedData.lat, clickedData.lon);
            myMap.flyTo(position, 10);
        })
        const position = new L.LatLng(result.lat, result.lon);
        currentMarkers.push(new L.marker(position).addTo(myMap));
        resultList.appendChild(li);
    }
}

async function getFoursquare(business) {
	let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
	let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
	let limit = 5
	let lat = 48.87007
	let lon = 2.346453
	let response = await fetch(
		`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
    ); 
   

    
    console.log(response);
    let data = await response.json()
    let businesses = data.response.groups[0].items
    for (i = 0; i < businesses.length; i++) {
        let location = { 
            name : businesses[i].venue.name, 
            lat: businesses[i].venue.location.lat , lon 
        }
    L.marker([location.lat, location.lon],{icon: redPin}).bindPopup(Location.name)



        
    }

    console.log(data);

}

/*async function setBussinessList() {
    const sumbitButton = document.getElementById();

    const response = await fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`)
    const result = await response.json();

    sumbitButton.addEventListener('click', () => {

    })
}*/




   

