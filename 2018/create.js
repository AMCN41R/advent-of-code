const fs = require("fs");

const args = process.argv.slice(2);

if (!args || !args[0] || !Number(args[0])) {
  console.log("Valid day argument must be provided.");
  return;
}

const day = Number(args[0]);
const dayStr = day < 10 ? `0${day}` : `${day}`;

const dir = `day${dayStr}`;

let pj = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
pj.scripts[`day${day}`] = `tsc && cd ./day${dayStr} && node index.js`
fs.writeFileSync('./package.json', JSON.stringify(pj, null, 2));

if (fs.existsSync(dir)) {
  console.log(`Directory '${dir}' already exists.`);
  return;
}

const content =
  'import * as utils from "../utils";\r\n' +
  'const { logPartOne, logPartTwo } = utils;\r\n' +
  'const log = console.log;\r\n' +
  '\r\n' +
  'export const input = utils.getLines(__dirname + "/input.txt");\r\n' +
  '\r\n' +
  'export const testInput: string[] = [];\r\n' +
  `\r\n` +
  `\r\n` +
  'logPartOne();\r\n' +
  '\r\n' +
  'export const partOne = (items: string[]): number => {\r\n' +
  '  return 0;\r\n' +
  '}\r\n' +
  '\r\n' +
  'log("P1 Result (test):", partOne(testInput)); // expected: \r\n' +
  '// log("P1 Result:", partOne(input)); // answer: \r\n' +
  'log();\r\n' +
  '\r\n' +
  '\r\n' +
  'logPartTwo();\r\n' +
  '\r\n' +
  'export const partTwo = (items: string[]): number => {\r\n' +
  '  return 0;\r\n' +
  '}\r\n' +
  '\r\n' +
  'log("P2 Result (test):", partTwo(testInput)); // expected: \r\n' +
  '// log("P2 Result:", partTwo(input)); // answer: \r\n' +
  'log();\r\n';

const test =
  'global.console = { log: jest.fn() }\r\n' +
  'const index = require("./index");\r\n' +
  '\r\n' +
  'test("part one - test", () => {\r\n' +
  '  expect(index.partOne(index.testInput)).toBe(0);\r\n' +
  '})\r\n' +
  '\r\n' +
  'test("part one", () => {\r\n' +
  '  expect(index.partOne(index.input)).toBe(0);\r\n' +
  '})\r\n' +
  '\r\n' +
  'test("part two - test", () => {\r\n' +
  '  expect(index.partTwo(index.testInput)).toBe(0);\r\n' +
  '})\r\n' +
  '\r\n' +
  'test("part two", () => {\r\n' +
  '  expect(index.partTwo(index.input)).toBe(0);\r\n' +
  '})\r\n' +
  '\r\n';

fs.mkdirSync(dir);
fs.appendFileSync(`./${dir}/index.ts`, content);
fs.appendFileSync(`./${dir}/index.test.js`, test);
fs.appendFileSync(`./${dir}/input.txt`, "");
fs.appendFileSync(`./${dir}/README.md`, "");
