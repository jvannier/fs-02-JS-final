// client id K0YVHW4RB0BN4CQNHMUOE5MJPM3FPVHLV0D031M1EZFPLJZV
// client secret RSGGUL3X1SWUNORFOEX503N2I31GO0DMRPU0N31KCNKBFNHI
// map1 api key fsq3xdOgDzcrTjJkcKpvOtTojDwQ0qnX2svZVbKLtFkLhjM=

async function getFoursquare(business, lat, lon) {
    let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
    let clientSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
    let limit = 5

    // call foursquare
    let response = await fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`)

    // parse response
    const data = await response.json()

    const items = data.response.groups[0].items

    let locations = items.map((item) => {
        let venue = item.venue
        let location = venue.location

        return {
            name: venue.name,
            lat: location.lat,
            lon: location.lng
        }
    })

    return locations
}


async function getBusinessLocations(businessType, lat, lon) {
    const locations = await getFoursquare(businessType, lat, lon)

    return locations;
}
