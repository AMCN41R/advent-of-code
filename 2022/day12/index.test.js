global.console = { log: jest.fn() }
const index = require("./index");

test.skip("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(31);
})

test.skip("part one", () => {
  expect(index.partOne(index.input)).toBe(440);
})

test.skip("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(29);
})

test.skip("part two", () => {
  expect(index.partTwo(index.input)).toBe(439);
})
