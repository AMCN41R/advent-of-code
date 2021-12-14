import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  "NNCB",
  "",
  "CH -> B",
  "HH -> N",
  "CB -> H",
  "NH -> C",
  "HB -> C",
  "HC -> B",
  "HN -> C",
  "NN -> C",
  "BH -> H",
  "NC -> B",
  "NB -> B",
  "BN -> B",
  "BB -> N",
  "BC -> B",
  "CC -> N",
  "CN -> C",
];


logPartOne();

export const partOne = (items: string[]): number => {
  let polymer = items[0].split("");

  const rules = items.slice(2).reduce<Map<string, string>>((map, i) => {
    const [pair, char] = i.split(" -> ");
    map.set(pair, char);
    return map;
  }, new Map());

  for (let i = 1; i <= 10; i++) {

    const pairs = polymer.reduce<string[]>((p, c, i) =>
      i === polymer.length - 1
        ? p
        : [...p, `${c}${polymer[i + 1]}`]
      , []);

    const s = pairs.reduce<string[]>((arr, p) =>
      rules.has(p)
        ? arr.length === 0
          ? [...arr, `${p[0]}${rules.get(p)}${p[1]}`]
          : [...arr, `${rules.get(p)}${p[1]}`]
        : [...arr, p]
      , []).join("");

    polymer = s.split("");
  }

  const most = utils.mostFrequent(polymer);
  const least = utils.leastFrequent(polymer);

  return most.count - least.count;
}

log("P1 Result (test):", partOne(testInput)); // expected: 1588
log("P1 Result:", partOne(input)); // answer: 2584
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  return 0;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 2188189693529
// log("P2 Result:", partTwo(input)); // answer: 
log();
