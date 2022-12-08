global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe('CMZ');
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe('LJSVLTWQM');
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe('MCD');
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe('BRQWDBBJM');
})

