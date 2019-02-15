const fs = require("fs");

const curries = JSON.parse(fs.readFileSync("./curry.json").toString());
const locations = fs.readFileSync("./curry-with-location.csv").toString().split("\n");

const curryWithLocation = [];
locations.forEach(curry => {
    const token = curry.split(",");
})