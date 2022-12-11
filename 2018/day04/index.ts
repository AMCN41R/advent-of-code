import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:55] wakes up',
  '[1518-11-05 00:45] falls asleep',
];

type ShiftLine = { dte: number, mins: number, info: string };

const isGuard = (item: ShiftLine): boolean => item.info.startsWith('Guard');
const getId = (item: ShiftLine): string => item.info.split(' ')[1].replace('#', '');

const parse = (items: string[]): ShiftLine[] => {
  const data = items.map(x => {

    const dte = Date.parse(x.substring(1, 17));
    const mins = new Date(dte).getMinutes();
    const info = x.substring(19);

    return { dte, mins, info }
  }).sort((a, b) => a.dte - b.dte);

  return data;
}

const run = (lines: ShiftLine[]): { [key: string]: number[] } => {
  let guard = '0';
  let guards: { [key: string]: number[] } = {};
  let start = 0;

  for (const line of lines) {
    // guard
    if (isGuard(line)) {
      guard = getId(line);
      if (!guards[guard]) {
        guards[guard] = [];
      }
      continue;
    }

    // falls asleep
    if (line.info === 'falls asleep') {
      start = line.mins;
      continue;
    }

    // wakes up
    if (line.info === 'wakes up') {
      const l = line.mins - start;
      const mins = Array.from({ length: l }, (_, i) => i + start);
      guards[guard] = guards[guard].concat(mins);
      continue;
    }
  }

  return guards;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const data = parse(items);
  const guards = run(data);

  const sleepiest = Object.keys(guards).map(x => ({ id: x, mins: guards[x] }))
    .sort((a, b) => b.mins.length - a.mins.length)[0];

  const result = utils.mode(sleepiest.mins).value;

  return result * Number(sleepiest.id);
}

log("P1 Result (test):", partOne(testInput)); // expected: 240
log("P1 Result:", partOne(input)); // answer: 101262
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const data = parse(items);
  const guards = run(data);

  const sleepiest = Object.keys(guards).map(x => ({ id: x, mins: guards[x] }))
  .map(x => ({id: x.id, min: utils.mode(x.mins)}))
  .sort((a,b) => b.min.count - a.min.count)[0];

  return Number(sleepiest.id) * sleepiest.min.value;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 4455
log("P2 Result:", partTwo(input)); // answer: 71976
log();
