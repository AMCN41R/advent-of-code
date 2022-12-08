import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '1000',
  '2000',
  '3000',
  '',
  '4000',
  '',
  '5000',
  '6000',
  '',
  '7000',
  '8000',
  '9000',
  '',
  '10000',
];


logPartOne();

export const partOne = (items: string[]): number => {
  const elves = items.join('|').split('||').map(x => {
    const calories = x.split('|').map(c => Number(c));
    return utils.sum(calories);
  });

  const max = elves.sort((a, b) => b - a)[0];

  return max;
}

log("P1 Result (test):", partOne(testInput)); // expected: 24000
log("P1 Result:", partOne(input)); // answer: 74394
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const elves = items.join('|').split('||').map(x => {
    const calories = x.split('|').map(c => Number(c));
    return utils.sum(calories);
  });

  const top3 = elves.sort((a, b) => b - a).slice(0, 3);
  const total = utils.sum(top3)

  return total;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 45000
log("P2 Result:", partTwo(input)); // answer: 212836
log();
