import * as utils from "../utils";
const { log, logPart } = utils;

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

logPart('ONE');

const partOne = (items: number[]) => items.reduce((total, next, i) => {
  return next > items[i - 1] ? total + 1 : total;
}, 0);

log([
  { msg: 'test', expected: 7, result: partOne(testInput) },
  { msg: 'result', expected: 1266, result: partOne(input) },
]);


logPart('TWO');

const partTwo = (items: number[]) => items.map((item, i) => {
  const l = items.length - 1;
  if ((i + 1) > l || (i + 2) > l) return -1;
  return item + items[i + 1] + items[i + 2];
}).filter(x => x !== -1);

log([
  { msg: 'test', expected: 5, result: partOne(partTwo(testInput)) },
  { msg: 'result', expected: 1217, result: partOne(partTwo(input)) },
]);
