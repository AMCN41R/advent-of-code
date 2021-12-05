global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(5);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(5442);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(12);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(19571);
})

