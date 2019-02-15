const fs = require("fs");

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA3a8P2sn0z0RTxVlokcl0JNC3ZGlG1y3w',
  Promise: Promise,
});

const curries = JSON.parse(fs.readFileSync("./curry.json").toString());

async function getLocation(index) {
    if (index >= curries.length) return;
    
    const curry = curries[index];

    let response;
    try {
        response = await googleMapsClient.geocode({address: curry.location}).asPromise()
    } catch(e) {
        console.error(`Error: ${e.message}`)
        return getLocation(index + 1);
    }

    const {lat, lng} = response.json.results[0].geometry.location;
     
    const data = `${curry.name},${curry.age},${curry.cost},${curry.gender},${curry.location},${curry.lineID},${curry.image},${lat},${lng}\n`;

    fs.appendFile('curry-with-location.csv', data, function (err) {
        if (err) console.error(`Error: ${err.message}`)

        getLocation(index + 1);
        console.log(`${index} - Saved! ${curry.name} at ${curry.location} - ${lat} ${lng}`)
    });
}

getLocation(0);