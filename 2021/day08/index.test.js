global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(26);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(288);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(61229);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(940724);
})

