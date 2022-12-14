import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  "5483143223",
  "2745854711",
  "5264556173",
  "6141336146",
  "6357385478",
  "4167524645",
  "2176841721",
  "6882881134",
  "4846848554",
  "5283751526",
];

type Direction = "U" | "D" | "L" | "R" | "UL" | "UR" | "DL" | "DR";

const canIncrease = (
  x: number,
  y: number,
  direction: Direction
): boolean => {
  switch (direction) {
    case "U": return y !== 0;
    case "D": return y !== 9;
    case "L": return x !== 0;
    case "R": return x !== 9;
    case "UL": return y !== 0 && x !== 0;
    case "UR": return y !== 0 && x !== 9;
    case "DL": return y !== 9 && x !== 0;
    case "DR": return y !== 9 && x !== 9;
    default:
      return false;
  }
}

const flash = (items: number[][], flashes: number): { grp: number[][], flashes: number } => {
  let oct = items.map(x => x.map(y => y + 1));

  const increase = (y: number, x: number): void => {
    if (oct[y][x] !== 0) oct[y][x]++;
  }

  while (true) {

    const willFlash = oct.flat(1).filter(x => x > 9).length > 0;
    if (!willFlash) break;

    for (let y = 0; y < oct.length; y++) {
      for (let x = 0; x < oct[y].length; x++) {
        const o = oct[y][x];

        const check = (d: Direction): boolean => canIncrease(x, y, d);

        if (o > 9) {
          flashes++;
          oct[y][x] = 0;

          if (check("U")) increase(y - 1, x) // up
          if (check("D")) increase(y + 1, x) // down
          if (check("L")) increase(y, x - 1) // left
          if (check("R")) increase(y, x + 1) // right

          if (check("UL")) increase(y - 1, x - 1) // UL
          if (check("UR")) increase(y - 1, x + 1) // UR
          if (check("DL")) increase(y + 1, x - 1) // DL
          if (check("DR")) increase(y + 1, x + 1) // DR
        }
      }
    }
  }

  return { grp: oct, flashes }
}


logPartOne();

export const partOne = (items: string[]): number => {
  let oct = items.map(x => x.split("").map(Number));

  let flashes = 0;

  for (let i = 1; i <= 100; i++) {
    const step = flash(oct, flashes);
    oct = step.grp;
    flashes = step.flashes;
  }

  return flashes;
}

log("P1 Result (test):", partOne(testInput)); // expected: 1656
log("P1 Result:", partOne(input)); // answer: 1625
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  let oct = items.map(x => x.split("").map(Number));

  let flashes = 0;
  let sync = 0;
  let i = 0;

  while (sync === 0) {
    i++;

    const step = flash(oct, flashes);
    oct = step.grp;
    flashes = step.flashes;

    if (oct.flat(1).filter(x => x !== 0).length === 0) {
      sync = i;
    }
  }

  return sync;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 195
log("P2 Result:", partTwo(input)); // answer: 244
log();
