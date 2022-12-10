import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'addx 15',
  'addx -11',
  'addx 6',
  'addx -3',
  'addx 5',
  'addx -1',
  'addx -8',
  'addx 13',
  'addx 4',
  'noop',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx -35',
  'addx 1',
  'addx 24',
  'addx -19',
  'addx 1',
  'addx 16',
  'addx -11',
  'noop',
  'noop',
  'addx 21',
  'addx -15',
  'noop',
  'noop',
  'addx -3',
  'addx 9',
  'addx 1',
  'addx -3',
  'addx 8',
  'addx 1',
  'addx 5',
  'noop',
  'noop',
  'noop',
  'noop',
  'noop',
  'addx -36',
  'noop',
  'addx 1',
  'addx 7',
  'noop',
  'noop',
  'noop',
  'addx 2',
  'addx 6',
  'noop',
  'noop',
  'noop',
  'noop',
  'noop',
  'addx 1',
  'noop',
  'noop',
  'addx 7',
  'addx 1',
  'noop',
  'addx -13',
  'addx 13',
  'addx 7',
  'noop',
  'addx 1',
  'addx -33',
  'noop',
  'noop',
  'noop',
  'addx 2',
  'noop',
  'noop',
  'noop',
  'addx 8',
  'noop',
  'addx -1',
  'addx 2',
  'addx 1',
  'noop',
  'addx 17',
  'addx -9',
  'addx 1',
  'addx 1',
  'addx -3',
  'addx 11',
  'noop',
  'noop',
  'addx 1',
  'noop',
  'addx 1',
  'noop',
  'noop',
  'addx -13',
  'addx -19',
  'addx 1',
  'addx 3',
  'addx 26',
  'addx -30',
  'addx 12',
  'addx -1',
  'addx 3',
  'addx 1',
  'noop',
  'noop',
  'noop',
  'addx -9',
  'addx 18',
  'addx 1',
  'addx 2',
  'noop',
  'noop',
  'addx 9',
  'noop',
  'noop',
  'noop',
  'addx -1',
  'addx 2',
  'addx -37',
  'addx 1',
  'addx 3',
  'noop',
  'addx 15',
  'addx -21',
  'addx 22',
  'addx -6',
  'addx 1',
  'noop',
  'addx 2',
  'addx 1',
  'noop',
  'addx -10',
  'noop',
  'noop',
  'addx 20',
  'addx 1',
  'addx 2',
  'addx 2',
  'addx -6',
  'addx -11',
  'noop',
  'noop',
  'noop',
];

type instruction = { ins: string, val: number };

const parse = (items: string[]): instruction[] => (
  items.map(x => {
    if (x === 'noop') return { ins: 'noop', val: 0 };
    const parts = x.split(' ');
    return { ins: parts[0], val: Number(parts[1]) };
  })
);

const expand = (items: instruction[]): instruction[] => (
  items.reduce((arr, next) => {
    if (next.ins === 'noop') arr.push(next);
    else {
      arr.push({ ins: 'addx', val: 0 });
      arr.push(next);
    }
    return arr;
  }, [] as instruction[])
);


logPartOne();

export const partOne = (items: string[]): number => {
  const cycles = expand(parse(items));

  let x = 1;
  const keyCycles: number[] = [];

  for (let i = 0; i < cycles.length; i++) {
    const e = cycles[i];
    const n = i + 1;

    if (n === 20 || n === 60 || n === 100 || n === 140 || n === 180 || n === 220) {
      keyCycles.push(n * x);
    }

    x += e.val;
  }

  const result = utils.sum(keyCycles);

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 13140
log("P1 Result:", partOne(input)); // answer: 12980
log();


logPartTwo();

export const partTwo = (items: string[]): string => {
  const cycles = expand(parse(items));

  let x = 1;
  let i = 0;
  let res: string[] = [];

  for (let r = 0; r < 6; r++) {
    for (let p = 0; p < 40; p++) {
      const e = cycles[i];

      if (p === x - 1 || p === x || p === x + 1) {
        res.push('#')
      } else {
        res.push('.');
      }

      x += e.val;
      i += 1;
    }
  }

  const arr = utils.chunk(res, 40).map(x => x.join('')).join('\n');

  return arr;
}

log("P2 Result (test):");
log(partTwo(testInput));
// expected:
/**
    ##..##..##..##..##..##..##..##..##..##..
    ###...###...###...###...###...###...###.
    ####....####....####....####....####....
    #####.....#####.....#####.....#####.....
    ######......######......######......####
    #######.......#######.......#######.....
 */

log("P2 Result:");
log(partTwo(input)); // answer: BRJLFULP
/**
    ###..###....##.#....####.#..#.#....###..
    #..#.#..#....#.#....#....#..#.#....#..#.
    ###..#..#....#.#....###..#..#.#....#..#.
    #..#.###.....#.#....#....#..#.#....###..
    #..#.#.#..#..#.#....#....#..#.#....#....
    ###..#..#..##..####.#.....##..####.#....
 */
log();
