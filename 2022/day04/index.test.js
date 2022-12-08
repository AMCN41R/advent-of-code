global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(2);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(567);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(4);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(907);
})

