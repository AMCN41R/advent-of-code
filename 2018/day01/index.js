const utils = require("../utils");

const input = utils.getLines("input.txt");

const result = input.map(Number).reduce((prev, next) => prev + next, 0);
console.log("P1 Result:", result); // answer 490

const set = new Set([]);
let result2 = null;
let total = 0;

while (result2 === null) {

  for (const i of input.map(Number)) {
    const tot = total + i;
    if (set.has(tot)) {
      result2 = tot;
      break;
    }
    set.add(tot);
    total += i;
  }

}

console.log("P2 Result:", result2); // answer: 70357
