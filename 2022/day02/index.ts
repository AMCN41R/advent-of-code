import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'A Y',
  'B X',
  'C Z',
];

const scoreMap: { [key: string]: number } = {
  'A X': 4, // RR 1 + 3 = 4
  'A Y': 8, // RP 2 + 6 = 8
  'A Z': 3, // RS 3 + 0 = 3
  'B X': 1, // PR 1 + 0 = 1
  'B Y': 5, // PP 2 + 3 = 5
  'B Z': 9, // PS 3 + 6 = 9
  'C X': 7, // SR 1 + 6 = 7
  'C Y': 2, // SP 2 + 0 = 2
  'C Z': 6, // SS 3 + 3 = 6
};

const playMap: { [key: string]: string} = {
  'A X': 'A Z',
  'A Y': 'A X',
  'A Z': 'A Y',
  'B X': 'B X',
  'B Y': 'B Y',
  'B Z': 'B Z',
  'C X': 'C Y',
  'C Y': 'C Z',
  'C Z': 'C X',
};


logPartOne();

export const partOne = (items: string[]): number => {
  const scores = items.map(x => scoreMap[x]);
  const total = utils.sum(scores);

  return total;
}

log("P1 Result (test):", partOne(testInput)); // expected: 15
log("P1 Result:", partOne(input)); // answer: 15337
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const hands = items.map(x => playMap[x]);
  const scores = hands.map(x => scoreMap[x]);
  const total = utils.sum(scores);

  return total;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 12
log("P2 Result:", partTwo(input)); // answer: 11696
log();
