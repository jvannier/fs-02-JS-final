const getGeoLocation = () => {
    return new Promise((resolve, reject) => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation
                .getCurrentPosition(resolve, reject);
        } else {
            reject()
        }
    })
}

class Map {
    constructor() {

        this.userCurrentPosition = {
            lat: null,
            lon: null
        };
        this.map = null;

        this.start()
        // Allow the user to select a business type from a list and map the five nearest locations on the map using the Foursquare API.
    }

    start = async () => {
        await this.getUserCurrentPosition()
        await this.renderMap()
    }

    setMarker = (coordinates) => {
        const marker = L.marker(coordinates);

        return marker
            .addTo(this.map)
    }

    renderMap = () => {
        // Map the location on a Leaflet map.
        const coordinates = [this.userCurrentPosition.lat, this.userCurrentPosition.lon];

        this.map = L.map('map').setView(coordinates, 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '15',
        }).addTo(this.map)

        const marker = this.setMarker(coordinates)

        marker.bindPopup('<p1><b>You are here</b><br></p1>').openPopup()
    }

    getUserCurrentPosition = async function () {
        // Obtain the user's current location.
        const { coords } = await getGeoLocation()
        this.userCurrentPosition = {
            lat: coords.latitude,
            lon: coords.longitude
        }
    }
}
