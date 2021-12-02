import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2"
];


logPartOne();

export const partOne = (items: string[]) => {
  const pos = items.reduce((prev, next) => {
    const parts = next.split(" ");
    if (parts[0] === "forward") prev.h = prev.h + Number(parts[1]);
    if (parts[0] === "down") prev.d = prev.d + Number(parts[1]);
    if (parts[0] === "up") prev.d = prev.d - Number(parts[1]);
    return prev;
  }, { h: 0, d: 0 });

  const result = pos.h * pos.d;

  log("POS:", pos)
  log("RESULT:", result)
  log("");

  return result;
}

log("test");
partOne(testInput); // expected: 150

log("result")
partOne(input); // answer: 1840243


logPartTwo();

export const partTwo = (items: string[]) => {
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

  const result = pos.h * pos.d;

  log("POS:", pos)
  log("RESULT:", result)
  log("");

  return result;
}

log("test")
partTwo(testInput); // expected: 900

log("result")
partTwo(input); // answer: 1727785422
