import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '498,4 -> 498,6 -> 496,6',
  '503,4 -> 502,4 -> 502,9 -> 494,9',
];

type path = [number, number][];
type grid = { map: Set<string>, maxY: number };

const parse = (items: string[]): path[] => {
  return items.map(item => item.split(' -> ').map(x => utils.mapXY(x)));
}

const create = (paths: path[]): grid => {
  const grid = new Set<string>();

  let maxY = -1;

  for (const path of paths) {

    for (let i = 1; i < path.length; i++) {
      const point = path[i];
      const prev = path[i - 1];

      if (point[0] === prev[0]) {
        // drawLR
        const x = point[0];
        const y1 = Math.min(point[1], prev[1]);
        const y2 = Math.max(point[1], prev[1]);
        for (let y = y1; y <= y2; y++) {
          grid.add(`${x}#${y}`);
          if (y > maxY) maxY = y;
        }
      }
      else {
        // drawUpDown
        const y = point[1];
        const x1 = Math.min(point[0], prev[0]);
        const x2 = Math.max(point[0], prev[0]);
        for (let x = x1; x <= x2; x++) {
          grid.add(`${x}#${y}`);
          if (y > maxY) maxY = y;
        }
      }
    }

  }

  return { map: grid, maxY };
}

const run = (grid: grid, withFloor: boolean = false): number => {

  let intoTheVoid = false;
  let sand = 0;

  while (!grid.map.has(`${500}#${0}`)) {
    sand++;

    let x = 500;
    let y = 0;

    while (!intoTheVoid) {

      // hit the bottom
      if (withFloor && y + 1 === grid.maxY + 2) {
        grid.map.add(`${x}#${y}`);
        break;
      }

      // D
      if (!grid.map.has(`${x}#${y + 1}`)) {
        y++;
      }
      // DL
      else if (!grid.map.has(`${x - 1}#${y + 1}`)) {
        x--;
        y++;
      }
      // DR
      else if (!grid.map.has(`${x + 1}#${y + 1}`)) {
        x++;
        y++;
      }
      // LAND
      else {
        grid.map.add(`${x}#${y}`);
        break;
      }

      // into the void
      if (!withFloor && y >= grid.maxY) {
        intoTheVoid = true;
        sand--;
        grid.map.add(`${500}#${0}`)
      }
    }
  }

  return sand;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const paths = parse(items);
  const grid = create(paths);
  const result = run(grid);

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 24
log("P1 Result:", partOne(input)); // answer: 614
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const paths = parse(items);
  const grid = create(paths);
  const result = run(grid, true);

  return result;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 93
log("P2 Result:", partTwo(input)); // answer: 26170
log();
