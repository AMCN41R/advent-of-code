import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '2-4,6-8',
  '2-3,4-5',
  '5-7,7-9',
  '2-8,3-7',
  '6-6,4-6',
  '2-6,4-8',
];

const parsePair = (pair: string) => {
  const pairs = pair.split(',').map(parseElf);
  return { first: pairs[0], second: pairs[1] };
}

const parseElf = (pair: string) => {
  const values = pair.split('-').map(Number);
  return { lower: values[0], upper: values[1] };
}


logPartOne();

export const partOne = (items: string[]): number => {
  const pairs = items.map(parsePair);
  const overlaps = pairs.filter(x =>
    (x.first.lower <= x.second.lower && x.first.upper >= x.second.upper)
    ||
    (x.second.lower <= x.first.lower && x.second.upper >= x.first.upper)
  );

  return overlaps.length;
}

log("P1 Result (test):", partOne(testInput)); // expected: 2
log("P1 Result:", partOne(input)); // answer: 567
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const pairs = items.map(parsePair);
  const overlaps = pairs.filter(x =>
    (x.first.lower >= x.second.lower && x.first.lower <= x.second.upper)
    ||
    (x.first.upper >= x.second.lower && x.first.upper <= x.second.upper)
    ||
    (x.second.lower >= x.first.lower && x.second.lower <= x.first.upper)
    ||
    (x.second.upper >= x.first.lower && x.second.upper <= x.first.upper)
  );

  return overlaps.length;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 4
log("P2 Result:", partTwo(input)); // answer: 907
log();
