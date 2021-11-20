//Obtain user's location
async function getLocation() {
  let pos = await new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(resolve);
  });
  return [pos.coords.latitude, pos.coords.longitude];
}

let myMap = {
  location: [],
  stores: [],
  map: {},
  markers: {},

  //Create a Map
  createMap() {
    this.map = L.map("map", {
      center: this.location,
      zoom: 11,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: "15",
    }).addTo(this.map);

    let marker = L.marker(this.location).addTo(this.map);
    marker.bindPopup("<p1><b>Your Location</b><br></p1>").openPopup();
  },

  // Add markers to the map
  addMarkers(stores) {
    for (var i = 0; i < stores.length; i++) {
      let newStore = stores[i];
      this.markers[i] = L.marker([newStore.lat, newStore.long])
        .addTo(this.map)
        .bindPopup(`<p1>${newStore.name}</p1>`);
    }
  },
};

//GET response from API
async function getBusiness(business) {
  let clientId = "3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34";
  let clentSecret = "IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU";
  let limit = 5;
  let lat = myMap.location[0];
  let lon = -myMap.location[1];
  let response = await fetch(
    `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
  );
  let data = await response.json();
  let businesses = data.response.groups[0].items;
  return businesses;
}

// async function getBusiness(locale) {
//   let response = await fetch(
//     "https://60d23844858b410017b2d60b.mockapi.io/places"
//   );
//   let business = await response.json();
//   return business;
// }

//Get the stores information
function getStores(businesses) {
  let stores = businesses.map((store) => {
    let location = {
      name: store.venue.name,
      lat: store.venue.location.lat,
      long: store.venue.location.lng,
    };
    return location;
  });
  return stores;
}

//Submit button and get API and info then addMarkers
document.getElementById("submit").addEventListener("click", async (event) => {
  let business = document.querySelector("#stores").value;
  let data = await getBusiness(business);
  let stores = getStores(data);
  myMap.addMarkers(stores);
});

//Load
window.onload = async () => {
  let position = await getLocation();
  myMap.location = position;
  myMap.createMap();
};
