const fs = require("fs");
const groups = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n\n");

// part one
console.log("Part One");
const sum1 = groups.map(x => x.replace(/\n/g, "")).map(x => new Set([...(x)]).size).reduce((a, b) => a + b, 0);
console.log("Sum:", sum1); // answer: 6782

// part two
console.log("\nPart Two");
const sum2 = groups.map(x => x.split("\n"))
  .map(x =>
    x.reduce((a, b) => a.filter(f => b.includes(f)), [..."abcdefghijklmnopqrstuvwxyz"])
      .reduce((a, b) => a + b.length, 0))
  .reduce((a, b) => a + b, 0);
console.log("Sum:", sum2); // answer 3596