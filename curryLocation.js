const fs = require("fs");

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA3a8P2sn0z0RTxVlokcl0JNC3ZGlG1y3w',
  Promise: Promise,
});

const curries = JSON.parse(fs.readFileSync("./curry.json").toString());
const data = [];

async function fetchLocation(place) {
    let response;
    
    try {
        response = await googleMapsClient.geocode({address: place}).asPromise()
    } catch(e) {
        console.log("ERROR~~", e.message)
        return {};
    }

    if (response.json.results[0] === undefined) {
        return {};
    }

    const {lat, lng} = response.json.results[0].geometry.location;

    return {lat, lng}
}

async function getLocation() {
    let index = 1;

    for (let curry of curries) {
        const locations = []

        console.log(`${index++} - ${curry.name} (${curry.lineID}) ${curry.cost}THB`)

        for (let location of curry.location.split(',')) {
            locations.push(await fetchLocation(location))
            console.log(`Location> ${location}`)
        }

        data.push({
            ...curry,
            location: locations,
        })

        console.log(`Finsihed ${curry.name}\n`)
    }

    console.log("DONE~");
    fs.writeFileSync("./curry-with-location.json", JSON.stringify(data, 2, 2))
}

getLocation();
