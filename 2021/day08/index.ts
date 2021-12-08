import * as utils from "../utils";
const { logPartOne, logPartTwo, has } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
  "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
  "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
  "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
  "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
  "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
  "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
  "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
  "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
  "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
];


logPartOne();

export const partOne = (items: string[]): number => {
  return items.map(x => x.split(" | ")[1].split(" ")).flat(1).filter(x =>
    x.length === 2 ||
    x.length === 3 ||
    x.length === 4 ||
    x.length === 7).length;
}

log("P1 Result (test):", partOne(testInput)); // expected: 26
log("P1 Result:", partOne(input)); // answer: 288
log();


logPartTwo();

type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;
type NumberMap = { [key: string]: Digit };

const getMap = (line: string): NumberMap => {
  const parts = line.split(" | ")[0].split(" ").map(x => x.split(""));

  const d1 = parts.filter(x => x.length === 2 || x.length === 3).flat(1).filter((v, i, a) => a.indexOf(v) !== i);
  const d2 = parts.filter(x => x.length === 4).flat(1).filter(x => d1.indexOf(x) === -1);

  const result = parts.reduce((obj, x) => {
    const key = x.sort().join("");

    if (x.length === 2) obj[key] = 1;
    if (x.length === 3) obj[key] = 7;
    if (x.length === 4) obj[key] = 4;
    if (x.length === 7) obj[key] = 8;

    if (x.length === 5) {
      if (has(x, d1[0]) && has(x, d1[1])) obj[key] = 3;
      else if (has(x, d2[0]) && has(x, d2[1])) obj[key] = 5;
      else obj[key] = 2;
    }

    if (x.length === 6) {
      if (!(has(x, d1[0]) && has(x, d1[1]))) obj[key] = 6;
      else if (has(x, d2[0]) && has(x, d2[1])) obj[key] = 9;
      else obj[key] = 0;
    }

    return obj;
  }, {} as NumberMap);

  return result;
}

const calc = (line: string): number => {
  const map = getMap(line);
  const output = line.split(" | ")[1].split(" ").map(x => x.split("").sort().join(""));
  const result = output.map(x => map[x]).join("");

  return parseInt(result);
}

export const partTwo = (items: string[]): number => {
  return items.reduce((sum, i) => sum + calc(i), 0);
}

log("P2 Result (test):", partTwo(testInput)); // expected: 61229
log("P2 Result:", partTwo(input)); // answer: 940724
log();
