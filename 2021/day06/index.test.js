global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.simulate(80, index.testInput)).toBe(5934);
})

test("part one", () => {
  expect(index.simulate(80, index.input)).toBe(345793);
})

test("part two - test", () => {
  expect(index.simulate(256, index.testInput)).toBe(26984457539);
})

test("part two", () => {
  expect(index.simulate(256, index.input)).toBe(1572643095893);
})

