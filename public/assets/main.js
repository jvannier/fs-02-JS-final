
window.onload = () => {


    const map = new Map()

    document.getElementById('submit').addEventListener('click', async (event) => {
        event.preventDefault()
        const businessType = document.getElementById('business').value
        const { lat, lon } = map.userCurrentPosition;
        let businessMarkers = await getBusinessLocations(businessType, lat, lon);

        businessMarkers.forEach(function (marker) {
            map.setMarker([marker.lat, marker.lon]).bindPopup(`<p><b>${marker.name}</b></p>`)
        });
    });
}




