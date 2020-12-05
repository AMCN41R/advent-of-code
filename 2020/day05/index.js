const fs = require("fs");
const seats = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split(/\n/);

const mid = rng => Math.ceil(((rng[1] - rng[0]) / 2) + rng[0]);

const rdc = l => (a, b) => {
  const m = mid(a);
  return b === l ? [a[0], m - 1] : [m, a[1]];
}

const ids = seats.map(x => {
  const r = [...x.slice(0, -3)].reduce(rdc("F"), [0, 127]);
  const c = [...x.slice(-3)].reduce(rdc("L"), [0, 8]);
  return (r[0] * 8) + c[0];
}).sort((a, b) => b - a);

// part one
console.log("Part One");
console.log("Highest Seat Id:", ids[0]); // answer 935

// part two
console.log("\nPart Two");
let p;
ids.reduce((a, b) => {
  if (a - b === 2) p = a - 1;
  return b;
}, 0);
console.log("Seat Id:", p); // answer 743
