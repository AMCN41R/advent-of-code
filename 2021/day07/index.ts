import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  "16,1,2,0,4,2,7,1,2,14"
];

const getCrabs = (input: string[]) => input[0].split(",").map(Number);


logPartOne();

export const partOne = (items: string[]) => {
  const crabs = getCrabs(items);

  let moves: number = 0;

  for (let p = 0; p < crabs.length; p++) {
    const t = crabs.reduce((i, n) => i + (Math.abs(n - p)), 0);
    if (moves === 0 || t < moves) {
      moves = t;
    }
  }

  return moves;
}

log("P1 Result (test):", partOne(testInput)); // expected: 37
log("P1 Result:", partOne(input)); // answer: 364898
log();


logPartTwo();

export const partTwo = (items: string[]) => {
  const crabs = getCrabs(items);

  let moves: number = 0;

  for (let p = 0; p < crabs.length; p++) {
    const t = crabs.reduce((i, n) => {
      const m = Math.abs(n - p);
      return i + (m * (m + 1)) / 2;
    }, 0);

    if (moves === 0 || t < moves) {
      moves = t;
    }
  }

  return moves;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 168
log("P2 Result:", partTwo(input)); // answer: 104149091
