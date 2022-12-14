import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  "3,4,3,1,2"
];

export const simulate = (days: number, input: string[]): number => {
  const fish = input[0].split(",").map(Number);

  const ages = fish.reduce((prev, next) => {
    prev[next] = prev[next] + 1;
    return prev;
  }, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

  for (let d = 1; d <= days; d++) {
    let reset: number = 0;
    for (let i = 0; i < ages.length; i++) {
      if (i === 0) {
        reset = ages[0];
      }
      else {
        ages[i-1] = ages[i];
      }
    }
    ages[6] = ages[6] + reset;
    ages[8] = reset;
  }

  return ages.reduce((prev, next) => prev + next, 0);
}

logPartOne();
log("P1 Result (test):", simulate(80, testInput)); // expected: 5934
log("P1 Result:", simulate(80, input)); // answer: 345793
log();

logPartTwo();
log("P2 Result (test):", simulate(256, testInput)); // expected: 26984457539
log("P2 Result:", simulate(256, input)); // answer: 1572643095893
