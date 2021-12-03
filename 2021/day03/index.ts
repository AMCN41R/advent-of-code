import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];


logPartOne();

export const partOne = (items: string[]): number => {

  const ga = items.reduce((prev: number[], next: string) => {
    if (prev.length === 0) return [...next].map(Number);
    [...next].map(Number).forEach((x, i) => prev[i] = prev[i] + x);
    return prev;
  }, []).map(x => x >= (items.length / 2) ? 1 : 0);

  const ea = ga.map(x => x === 1 ? 0 : 1);

  const gamma = { b: ga.join(""), d: parseInt(ga.join(""), 2) };
  const epsilon = { b: ea.join(""), d: parseInt(ea.join(""), 2) };

  log("gamma:", gamma);
  log("epsilon:", epsilon);

  const result = gamma.d * epsilon.d;
  log("result:", result);
  log();

  return result;
}

log("test");
partOne(testInput); // expected: 198

log("result");
partOne(input); // answer: 3958484


logPartTwo();

const commonBit = (most: boolean, pos: number, items: number[][]): 1 | 0 => {
  const mostCommon = items.map(x => x[pos])
    .reduce((prev, next) => prev + next, 0) >= (items.length / 2)
    ? 1
    : 0;

  return most
    ? mostCommon
    : mostCommon === 1 ? 0 : 1
}

const filter = (items: number[][], mostCommon: boolean): { b: string, d: number } | null => {
  let set = items.slice(0);
  for (let i = 0; i < set[0].length; i++) {
    set = set.filter(x => x[i] === commonBit(mostCommon, i, set));

    if (set.length === 1) {
      return { b: set[0].join(""), d: parseInt(set[0].join(""), 2) };
    }
  }

  return null;
}

export const partTwo = (items: string[]): number => {
  let set = items.map(x => [...x].map(Number));

  const ox = filter(set, true);
  const co = filter(set, false);

  const result = (ox?.d || 0) * (co?.d || 0);

  log("OX:", ox);
  log("CO:", co);
  log("result:", result);
  log();

  return result;
}

log("test");
partTwo(testInput); // expected: 230

log("result");
partTwo(input); // answer: 1613181
