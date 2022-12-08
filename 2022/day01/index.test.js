global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(24000);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(74394);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(45000);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(212836);
})

