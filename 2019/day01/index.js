const fs = require("fs");

const content = fs.readFileSync("input.txt", "utf-8");
const modules = content.split("\r\n").map(Number);

const getFuel = (mass) => Math.floor( mass / 3) - 2;

// part one
const moduleFuel = modules.map(x => getFuel(x)).reduce((a, b) => a + b, 0);
console.log("Required Module Fuel:", moduleFuel);

// part two
const calc = (mass) => mass <= 0 ? 0 : mass + calc(getFuel(mass));
const totalFuel = modules.map(x => calc(x) - x).reduce((a, b) => a + b, 0);
console.log("Total Required Fuel:", totalFuel);
