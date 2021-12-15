const fs = require("fs");
const lines = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n");

const testLines = [
  "939",
  "7,13,x,x,59,x,31,19"
];

const partOne = (input) => {
  const d = Number(input[0]);
  const buses = input[1].split(",").filter(x => x !== "x");

  const times = buses
    .map(Number)
    .map(x => ({
      b: x,
      t: ((Math.floor(d / x) + 1) * x) - d
    })).sort((a, b) => a.t - b.t);

  const bus = times[0];

  console.log(bus, bus.b * bus.t)
}

console.log("PART ONE")
partOne(testLines); // expected: 295
partOne(lines); // answer: 4938

const partTwo = (input) => {
  
}

console.log();
console.log("PART TWO")
partTwo(testLines); // expected: 295
// partTwo(lines); // answer: