// Source From: https://www.latlong.net/category/cities-221-15.html
const randomLocation = require("random-location");
const path = require("path");
const fs = require("fs");

const totalPerPlace = 25;
const radius = 20 * 1000;

const provinces = JSON.parse(fs.readFileSync(path.join(__dirname, "thailand-location-raw.json")).toString());
const locations = [];

provinces.forEach(province => {
    for (let i = 0; i < totalPerPlace; ++i) {
        locations.push({
            label: province[0],
            ...randomLocation.randomCirclePoint({
                latitude: province[1],
                longitude: province[2],
            }, radius)
        })
    }
})

fs.writeFileSync(path.join(__dirname, "thailand-location.json"),
    JSON.stringify(locations, 2, 2))

console.log("DONE~")

