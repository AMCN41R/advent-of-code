import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt").map(Number);

export const testInput = [
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

logPartOne();

export const partOne = (items: number[]): number => {
  const result = items.reduce((total, next, i) => next > items[i - 1] ? total + 1 : total, 0)
  return result;
};

log("TEST:", partOne(testInput)); // expected 7
log("RESULT:", partOne(input)); // answer: 1266
log();

logPartTwo();

export const partTwo = (items: number[]): number => {
  const grp = items.map((item, i) => {
    const l = items.length - 1;
    if ((i + 1) > l || (i + 2) > l) return -1;
    return item + items[i + 1] + items[i + 2];
  }).filter(x => x !== -1);

  const result = partOne(grp);

  return result;
};

log("TEST:", partTwo(testInput)); // expected: 5
log("RESULT:", partTwo(input)); // answer: 1217
