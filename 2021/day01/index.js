const utils = require("../utils");

const input = utils.getLines("input.txt").map(Number);

const testInput = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263
]

const partOne = (items) => items.reduce((total, next, i) => {
  return next > items[i - 1] ? total + 1 : total;
}, 0);

console.log("P1 RESULT (test):", partOne(testInput)); // expected: 7
console.log("P1 RESULT:", partOne(input)); // answer: 1266


const partTwo = (items) => items.map((item, i) => {
  const l = items.length-1;
  if ((i+1) > l || (i+2)> l) return -1;
  return item + items[i + 1] + items[i + 2];
}).filter(x => x !== -1);

console.log("P2 RESULT (test):", partOne(partTwo(testInput))); // expected: 5
console.log("P2 RESULT:", partOne(partTwo(input))); // answer: 1217
