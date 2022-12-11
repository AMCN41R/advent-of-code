global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(4);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(118539);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(3);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(1270);
})

