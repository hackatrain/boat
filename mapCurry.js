const fs = require("fs");

const curries = JSON.parse(fs.readFileSync("./curry.json").toString());
const curriesWithLocation = JSON.parse(fs.readFileSync("./curry-with-location.json").toString());

const search = (username) => curries.find(({name}) => name === username);

const curriesWithLabel = curriesWithLocation.map(curry => {
    const item = search(curry.name);
    if (!item) {
        return {}
    }

    const places = search(curry.name).location.split(",");
    const location = curry.location.map((data, index) => ({
        ...data,
        label: places[index].trim(),
    }))

    return {
        ...curry,
        location,
    }
})

fs.writeFileSync("./curry-with-location.json", JSON.stringify(curriesWithLabel, 2, 2))
console.log("MAP CURRY DONE~")
