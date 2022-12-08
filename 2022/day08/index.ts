import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390',
];

const passNorth = (items: string[], row: number, col: number) => {
  const h = items[row][col];
  let pos = row - 1;
  let score = 0;
  while (pos >= 0) {
    if (items[pos][col] >= h) {
      score += 1;
      return { visible: false, score };
    }
    pos -= 1;
    score += 1;
  }

  return { visible: true, score };
}

const passSouth = (items: string[], row: number, col: number) => {
  const h = items[row][col];
  let pos = row + 1;
  let score = 0;
  while (pos < items.length) {
    if (items[pos][col] >= h) {
      score += 1;
      return { visible: false, score };
    }
    pos += 1;
    score += 1;
  }

  return { visible: true, score };
}

const passWest = (items: string[], row: number, col: number) => {
  const h = items[row][col];
  let pos = col - 1;
  let score = 0;
  while (pos >= 0) {
    if (items[row][pos] >= h) {
      score += 1;
      return { visible: false, score };
    }
    pos -= 1;
    score += 1;
  }

  return { visible: true, score };
}

const passEast = (items: string[], row: number, col: number) => {
  const h = items[row][col];
  let pos = col + 1;
  let score = 0;
  while (pos < items[0].length) {
    if (items[row][pos] >= h) {
      score += 1;
      return { visible: false, score };
    }
    pos += 1;
    score += 1;
  }

  return { visible: true, score };
}


logPartOne();

export const partOne = (items: string[]): number => {

  let visible = 0;

  const numCols = items[0].length - 1;
  const numRows = items.length - 1;

  for (let rowNumber = 0; rowNumber < items.length; rowNumber++) {
    const row = items[rowNumber];

    for (let col = 0; col < row.length; col++) {
      if (rowNumber === 0 || col === 0 || rowNumber === numRows || col === numCols) {
        visible += 1;
        continue;
      }

      if (passNorth(items, rowNumber, col).visible) {
        visible += 1
        continue;
      }
      if (passSouth(items, rowNumber, col).visible) {
        visible += 1
        continue;
      }
      if (passWest(items, rowNumber, col).visible) {
        visible += 1
        continue;
      }
      if (passEast(items, rowNumber, col).visible) {
        visible += 1
        continue;
      }
    }
  }

  return visible;
}

log("P1 Result (test):", partOne(testInput)); // expected: 21
log("P1 Result:", partOne(input)); // answer: 1662
log();


logPartTwo();

export const partTwo = (items: string[]): number => {

  const scores: number[] = [];

  for (let rowNumber = 0; rowNumber < items.length; rowNumber++) {
    const row = items[rowNumber];

    for (let col = 0; col < row.length; col++) {

      const n = passNorth(items, rowNumber, col);
      const e = passEast(items, rowNumber, col);
      const s = passSouth(items, rowNumber, col);
      const w = passWest(items, rowNumber, col);

      scores.push(n.score * e.score * s.score * w.score);

    }
  }

  return scores.sort((a, b) => b - a)[0]
}

log("P2 Result (test):", partTwo(testInput)); // expected: 8
log("P2 Result:", partTwo(input)); // answer: 537600
log();
