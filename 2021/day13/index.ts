import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  "6,10",
  "0,14",
  "9,10",
  "0,3",
  "10,4",
  "4,11",
  "6,0",
  "6,12",
  "4,1",
  "0,13",
  "10,12",
  "3,4",
  "3,0",
  "8,4",
  "1,10",
  "2,14",
  "8,10",
  "9,0",
  "",
  "fold along y=7",
  "fold along x=5",
];

type Fold = { axis: string, value: number }
type Sheet = { points: string[], folds: Fold[] };

const parseInput = (input: string[]): Sheet => {
  const data = input.reduce((prev, next) => {
    if (next === "") return prev;
    if (next.startsWith("fold")) {
      const f = next.split(" ")[2].split("=");
      prev.folds.push({ axis: f[0], value: Number(f[1]) });
    }
    else {
      prev.points.push(next);
    }
    return prev;
  }, { points: [], folds: [] } as Sheet);

  return data;
}

const foldSheet = (points: string[], fold: Fold): string[] => {
  let result = new Set<string>();

  if (fold.axis === "y") {
    result = points.reduce((set, n) => {
      const p = n.split(",").map(Number);
      const x = p[0];
      const y = p[1];

      if (y === fold.value || y > fold.value * 2) return set;
      if (y < fold.value) {
        set.add(n);
      }
      else {
        const yd = y - (2 * (y - fold.value));
        set.add([x, yd].join(","));
      }
      return set;
    }, new Set<string>());
  }
  else {
    result = points.reduce((set, n) => {
      const p = n.split(",").map(Number);
      const x = p[0];
      const y = p[1];

      if (x === fold.value || x > fold.value * 2) return set;
      if (x < fold.value) {
        set.add(n);
      }
      else {
        const xd = x - (2 * (x - fold.value));
        set.add([xd, y].join(","));
      }
      return set;
    }, new Set<string>());
  }

  return Array.from(result);
}



logPartOne();

export const partOne = (items: string[]): number => {
  const sheet = parseInput(items);
  const fold = sheet.folds[0];

  const result = foldSheet(sheet.points, fold);

  return result.length;
}

log("P1 Result (test):", partOne(testInput)); // expected: 17
log("P1 Result:", partOne(input)); // answer: 618
log();


logPartTwo();

export const partTwo = (items: string[]): string => {
  const sheet = parseInput(items);

  let points = sheet.points.slice(0);

  for (const fold of sheet.folds) {
    points = (foldSheet(points, fold));
  }

  const pointsArr = points.map(x => x.split(",").map(Number));
  const maxX = pointsArr.map(x => x[0]).sort((a, b) => b - a)[0];
  const maxY = pointsArr.map(x => x[1]).sort((a, b) => b - a)[0];

  let result = "";
  const set = new Set<string>(points);
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const key = `${x},${y}`;
      const c = set.has(key) ? "#" : " ";
      result = `${result}${c}`;
    }
    result = `${result}${"\r\n"}`;
  }

  log(result);

  return "ALREKFKU";
}

log("P2 Result (test):", partTwo(testInput)); // expected: 
log("P2 Result:", partTwo(input)); // answer: ALREKFKU
log();
