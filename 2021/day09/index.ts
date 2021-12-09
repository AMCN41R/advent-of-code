import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

class Point {
  constructor(public x: number, public y: number) { }
  get key(): string {
    return `${this.x}.${this.y}`;
  }
}

const getLowPoints = (items: string[]): { height: number, row: number, x: number }[] => {
  const rows = items.map(x => x.split("").map(Number));
  const lowPoints = [];

  for (let ri = 0; ri < rows.length; ri++) {
    const row = rows[ri];
    for (let hi = 0; hi < row.length; hi++) {
      const height = row[hi];

      if (
        (ri - 1 < 0 || height < rows[ri - 1][hi])                   // up
        && (ri + 1 > rows.length - 1 || height < rows[ri + 1][hi])  // down
        && (hi - 1 < 0 || height < row[hi - 1])                     // left
        && (hi + 1 > row.length - 1 || height < row[hi + 1])        // right
      ) {
        lowPoints.push({
          height,
          row: ri,
          x: hi
        });
      }
    }
  }

  return lowPoints;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const lowPoints = getLowPoints(items);

  const riskScores = lowPoints.map(x => x.height + 1);
  const total = riskScores.reduce((sum, i) => sum + i, 0);

  return total;
}

log("P1 Result (test):", partOne(testInput)); // expected: 15
log("P1 Result:", partOne(input)); // answer: 631
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const rows = items.map(x => x.split("").map(Number));
  const lowPoints = getLowPoints(items);

  const basins: number[] = [];

  for (const lp of lowPoints) {
    const visited = new Set<string>();
    const toCheck: Point[] = [new Point(lp.x, lp.row)];

    while (toCheck.length > 0) {
      const p = toCheck.shift();
      if (!p) break;

      if (visited.has(p.key)) continue;
      visited.add(p.key);

      const { x, y } = p;

      if (y > 0 && rows[y - 1][x] !== 9) toCheck.push(new Point(x, y - 1)); // up
      if (y < rows.length - 1 && rows[y + 1][x] !== 9) toCheck.push(new Point(x, y + 1)); // down
      if (x > 0 && rows[y][x - 1] !== 9) toCheck.push(new Point(x - 1, y)); // left
      if (x < rows[0].length - 1 && rows[y][x + 1] !== 9) toCheck.push(new Point(x + 1, y)); // right
    }

    basins.push(visited.size);
  }

  const result = basins.sort((a, b) => b - a).slice(0, 3).reduce((sum, i) => sum * i, 1);

  return result;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 1134
log("P2 Result:", partTwo(input)); // answer: 821560
log();
