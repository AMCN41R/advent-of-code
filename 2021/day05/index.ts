import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  "0,9 -> 5,9",
  "8,0 -> 0,8",
  "9,4 -> 3,4",
  "2,2 -> 2,1",
  "7,0 -> 7,4",
  "6,4 -> 2,0",
  "0,9 -> 2,9",
  "3,4 -> 1,4",
  "0,0 -> 8,8",
  "5,5 -> 8,2",
];

class Point {
  constructor(public x: number, public y: number) {

  }

  get key(): string { return `${this.x}-${this.y}`; }
}

class Line {
  constructor(public p1: Point, public p2: Point) {

  }

  isStraight(): boolean {
    return this.p1.x === this.p2.x || this.p1.y === this.p2.y;
  }

  getPoints(): Point[] {
    const points: Point[] = [];

    const x1 = this.p1.x;
    const x2 = this.p2.x;

    const y1 = this.p1.y
    const y2 = this.p2.y

    if (x1 === x2) {
      const a = y1 < y2 ? y1 : y2;
      const b = a === y1 ? y2 : y1;
      for (let i = a; i <= b; i++) {
        points.push(new Point(x1, i));
      }

      return points;
    }

    if (y1 === y2) {
      const a = x1 < x2 ? x1 : x2;
      const b = a === x1 ? x2 : x1;
      for (let i = a; i <= b; i++) {
        points.push(new Point(i, y1));
      }

      return points;
    }

    const l = Math.abs(x1 - x2);
    points.push(new Point(x1, y1));
    for (let i = 1; i <= l; i++) {
      points.push(new Point(
        x1 > x2 ? x1 - i : x1 + i,
        y1 > y2 ? y1 - i : y1 + i
      ));
    }

    return points;
  }
}

const getLines = (items: string[]): Line[] => {
  return items
    .map(x => {
      const points = x.split(" -> ");
      const p1 = points[0].split(",").map(Number);
      const p2 = points[1].split(",").map(Number);
      return new Line(
        new Point(p1[0], p1[1]),
        new Point(p2[0], p2[1])
      )
    });
}


logPartOne();

export const partOne = (items: string[]) => {
  const lines = getLines(items).filter(x => x.isStraight());
  const points = lines.map(x => x.getPoints()).flat(1);

  const counts: { [key: string]: number } = {};
  points.forEach(x => { counts[x.key] = (counts[x.key] || 0) + 1; });

  const result = Object.values(counts).filter(x => x > 1).length;

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 5
log("P1 Result:", partOne(input)); // answer: 5442
log();


logPartTwo();

export const partTwo = (items: string[]) => {
  const lines = getLines(items);
  const points = lines.map(x => x.getPoints()).flat(1);

  const counts: { [key: string]: number } = {};
  points.forEach(x => { counts[x.key] = (counts[x.key] || 0) + 1; });

  const result = Object.values(counts).filter(x => x > 1).length;

  return result;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 12
log("P2 Result:", partTwo(input)); // answer: 19571
log();
