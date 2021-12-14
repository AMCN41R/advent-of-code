global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(1588);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(2584);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(0);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(0);
})

