import * as utils from "../utils";

const input = utils.getLines("input.txt");

const testInput = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2"
];

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

console.log("P1 RESULT (test):", partOne(testInput)); // expected: 15 x 10 = 150
console.log("P1 RESULT:", partOne(input)); // answer: 1840243


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

console.log("P2 RESULT (test):", partTwo(testInput)); // expected: 15 x 60 = 900
console.log("P2 RESULT:", partTwo(input)); // answer: 1727785422
