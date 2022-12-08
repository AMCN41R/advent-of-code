import { SocketAddress } from "net";
import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw',
];

const scores = `${utils.alpha}${utils.alphaCaps}`;


logPartOne();

export const partOne = (items: string[]): number => {
  const sacks = items.map(x => {
    const a = [...new Set(x.slice(0, x.length / 2))];
    const b = [...new Set(x.slice(x.length / 2))];
    const dupes = utils.getDuplicates(a.concat(b)).map(x => scores.indexOf(x) + 1);
    const score = utils.sum(dupes);
    return score;
  });

  var total = utils.sum(sacks);

  return total;
}

log("P1 Result (test):", partOne(testInput)); // expected: 157
log("P1 Result:", partOne(input)); // answer: 8515
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const groups = utils.chunk(items, 3);
  const sets = groups.map(group => {
    const bpi = group.map(x => [...new Set([...x])]).reduce((arr, n) => arr.concat([...new Set([...n])]), []);
    let dupes = utils.getDuplicates(bpi);
    while (dupes.length > 1) {
      dupes = utils.getDuplicates(dupes);
    }
    const score = utils.sum(dupes.map(x => scores.indexOf(x) + 1));

    return score;
  });

  const total = utils.sum(sets);

  return total;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 70
log("P2 Result:", partTwo(input)); // answer: 2434
log();
