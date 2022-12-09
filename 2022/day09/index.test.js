global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(13);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(6026);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(1);
  expect(index.partTwo(index.testInput2)).toBe(36);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(2273);
})

