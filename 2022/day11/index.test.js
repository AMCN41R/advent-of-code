global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(10605);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(101436);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(2713310158);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(19754471646);
})
