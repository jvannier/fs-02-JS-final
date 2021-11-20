// client id K0YVHW4RB0BN4CQNHMUOE5MJPM3FPVHLV0D031M1EZFPLJZV
// client secret RSGGUL3X1SWUNORFOEX503N2I31GO0DMRPU0N31KCNKBFNHI
// map1 api key fsq3xdOgDzcrTjJkcKpvOtTojDwQ0qnX2svZVbKLtFkLhjM=

async function getFoursquare(business, lat, lon) {
    let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
    let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
    let limit = 5

    let response = await fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`)

    const data = await response.json()

    let businesses = data.response.groups[0].items
    return businesses
}

function processBusinesses(data) {
    let businesses = data.map((element) => {
        let location = {
            name: element.venue.name,
            lat: element.venue.location.lat,
            lon: element.venue.location.lng,
        };
        return location
    })
    return businesses
}

async function getBusinessLocations(businessType, lat, lon) {
    const fourSquareItems = await getFoursquare(businessType, lat, lon)
    const locations = processBusinesses(fourSquareItems);

    return locations;
}
