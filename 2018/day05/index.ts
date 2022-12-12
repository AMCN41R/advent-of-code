import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'dabAcCaCBAcCcaDA'
];

const destroy = (line: string, pair: string): { destroyed: boolean, newLine: string } => {
  const newLine = line.replace(pair, '');
  return { destroyed: newLine !== line, newLine };
}

const react = (line: string, skip?: string): string => {
  let l = line
  const alpha = [...utils.alpha];
  while (true) {
    let count = 0;
    for (let i = 0; i < alpha.length; i++) {
      const e = alpha[i];
      if (skip && skip === e) continue;
      const r = destroy(l, `${e.toLocaleLowerCase()}${e.toLocaleUpperCase()}`);
      l = r.newLine;
      const r2 = destroy(l, `${e.toLocaleUpperCase()}${e.toLocaleLowerCase()}`);
      l = r2.newLine;

      if (r.destroyed || r2.destroyed) count += 1;
    }

    if (count === 0) break;
  }

  return l;
}

logPartOne();

export const partOne = (items: string[]): number => {
  const line = react(items[0]);
  return line.length;
}

log("P1 Result (test):", partOne(testInput)); // expected: 10
log("P1 Result:", partOne(input)); // answer: 10496
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const alpha = [...utils.alpha];
  const arr: { letter: string, line: string, reacted: string }[] = [];

  for (let i = 0; i < alpha.length; i++) {
    const e = alpha[i];
    const line = items[0].replace(new RegExp(e, 'gi'), '');
    const reacted = react(line, e);
    arr.push({ letter: e, line, reacted });
  }

  const result = arr.map(x => x.reacted).sort((a, b) => a.length - b.length)[0];
  return result.length;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 4
log("P2 Result:", partTwo(input)); // answer: 5774
log();
