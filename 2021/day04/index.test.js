global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(4512);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(38594);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(1924);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(21184);
})

