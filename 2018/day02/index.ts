import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'abcdef',
  'bababc',
  'abbcde',
  'abcccd',
  'aabcdd',
  'abcdee',
  'ababab',
];

const grp = (str: string) => [...str].reduce((a, e) => {
  a[e] = a[e] ? a[e] + 1 : 1;
  return a
}, {} as { [key: string]: number });


logPartOne();

export const partOne = (items: string[]): number => {
  const grps = items.map(x => grp(x));
  const twos = grps.filter(x => new Set(Object.values(x)).has(2)).length;
  const threes = grps.filter(x => new Set(Object.values(x)).has(3)).length;

  return twos * threes;
}

log("P1 Result (test):", partOne(testInput)); // expected: 12
log("P1 Result:", partOne(input)); // answer: 5658
log();


export const testInput2: string[] = [
  'abcde',
  'fghij',
  'klmno',
  'pqrst',
  'fguij',
  'axcye',
  'wvxyz',
];

logPartTwo();

export const partTwo = (items: string[]): string => {
  let result2 = null;
  let i = 0;
  const max = items[0].length - 1;
  const set = new Set<string>([]);

  while (result2 === null || i == max) {
    const ns = items.map(x => i === 0 ? x.slice(1) : x.slice(0, i) + x.slice(i + 1));
    for (const s of ns) {
      if (set.has(s)) {
        result2 = s;
        break;
      }
      set.add(s);
    }
    set.clear();
    i++;
  }

  return result2;
}

log("P2 Result (test):", partTwo(testInput2)); // expected: fgij
log("P2 Result:", partTwo(input)); // answer: nmgyjkpruszlbaqwficavxneo
log();
