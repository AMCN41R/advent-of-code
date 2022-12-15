global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput, 10)).toBe(26);
})

test("part one", () => {
  expect(index.partOne(index.input, 2e6)).toBe(4793062);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput, 20)).toBe(56000011);
})

test("part two", () => {
  expect(index.partTwo(index.input, 4e6)).toBe(10826395253551);
})

