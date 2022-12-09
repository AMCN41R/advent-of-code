import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '+1',
  '-2',
  '+3',
  '+1',
];


logPartOne();

export const partOne = (items: string[]): number => {
  return items.map(Number).reduce((prev, next) => prev + next, 0);
}

log("P1 Result (test):", partOne(testInput)); // expected: 3
log("P1 Result:", partOne(input)); // answer: 490
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const set = new Set<number>([]);
  let result2 = null;
  let total = 0;

  while (result2 === null) {

    for (const i of items.map(Number)) {
      const tot = total + i;
      if (set.has(tot)) {
        result2 = tot;
        break;
      }
      set.add(tot);
      total += i;
    }

  }

  return result2;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 2
log("P2 Result:", partTwo(input)); // answer: 70357
log();
