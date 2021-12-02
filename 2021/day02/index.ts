import * as utils from "../utils";
const { log, logPart } = utils;

const input = utils.getLines("input.txt");

const testInput = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2"
];

logPart('ONE');

const partOne = (items: string[]) => {
  const pos = items.reduce((prev, next) => {
    const parts = next.split(" ");
    if (parts[0] === "forward") prev.h = prev.h + Number(parts[1]);
    if (parts[0] === "down") prev.d = prev.d + Number(parts[1]);
    if (parts[0] === "up") prev.d = prev.d - Number(parts[1]);
    return prev;
  }, { h: 0, d: 0 });

  console.log("POS:", pos)
  return pos.h * pos.d;
}

log([
  {msg: 'test', expected: 150, result: partOne(testInput) },
  {msg: 'result', expected: 1840243, result: partOne(input) },
]);


logPart('TWO');

const partTwo = (items: string[]) => {
  const pos = items.reduce((prev, next) => {
    const parts = next.split(" ");
    if (parts[0] === "forward") {
      prev.h = prev.h + Number(parts[1]);
      prev.d = prev.d + (Number(parts[1]) * prev.a);
    }
    if (parts[0] === "down") prev.a = prev.a + Number(parts[1]);
    if (parts[0] === "up") prev.a = prev.a - Number(parts[1]);
    return prev;
  }, { h: 0, d: 0, a: 0 });

  console.log("POS:", pos)
  return pos.h * pos.d;
}

log([
  {msg: 'test', expected: 900, result: partTwo(testInput) },
  {msg: 'result', expected: 1727785422, result: partTwo(input) },
]);
