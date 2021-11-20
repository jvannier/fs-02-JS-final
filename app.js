// map object
function buildMap(coordinates) {
  let dataLat = coordinates[0];
  let dataLong = coordinates[1];
  const dataName = "You are here";
  var myMap = L.map("map").setView([dataLat, dataLong], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9tc2VsZGVuIiwiYSI6ImNrdzZyYm4yODFoZWcybm1wajc5eW03ZnAifQ.ynQ0JOY8NF86NE19iT_htA",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "your.mapbox.access.token",
    }
  ).addTo(myMap);
  return myMap;

  //   makeMapMarker(dataLat, dataLong, dataName);

  //   makes map markers
  //   let makeMapMarker= {
  //     name: data[i].name,
  //     lat: data[i].latitude,
  //     long: data[i].longitude,

  //   };
  
}
function makeMapMarkers(myMap, businesses) {
    let markers = [];
    for (let i = 0; i > businesses.length; i++) {
      this.markers = L.marker([businesses[i].lat, businesses[i].long])
        .addTo(myMap)
        .bindPopup(`<p1>${businesses[i].name}</p1>`)
  
        .openPopup()
        ;
    }
  }



// get user's location
async function getCoords() {
  pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  console.log(pos);
  return [pos.coords.latitude, pos.coords.longitude];
}
// get business type // event handlers
function getBusiness() {
  let list = document.getElementById("business");
  let value = list.value;
  console.log(value);
  getFoursquare(value);
}

// window on load
window.onload = async () => {
  let coords = await getCoords();
  let myMap = buildMap(coords);
  makeMapMarkers(myMap)
};

// foursquare api
async function getFoursquare(business) {
  let clientId = "3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34";
  let clentSecret = "IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU";
  let limit = 5;
  let lat = 40.2381638;
  let lon = -74.005232;
  let response = await fetch(
    `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
  )
    console.log(response)
    let data = await response.json()
    console.log(data)
    makeMapMarkers(data)
}
getFoursquare("coffee")
// .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//    lat: 40.2381638, longitude: -74.005232