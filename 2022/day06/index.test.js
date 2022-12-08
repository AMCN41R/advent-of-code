global.console = { log: jest.fn() }
const index = require("./index");

test("part one - test", () => {
  expect(index.partOne(index.testInput)).toBe(7);
  expect(index.partOne(['bvwbjplbgvbhsrlpgdmjqwftvncz'])).toBe(5);
  expect(index.partOne(['nppdvjthqldpwncqszvftbrmjlhg'])).toBe(6);
  expect(index.partOne(['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'])).toBe(10);
  expect(index.partOne(['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'])).toBe(11);
})

test("part one", () => {
  expect(index.partOne(index.input)).toBe(1794);
})

test("part two - test", () => {
  expect(index.partTwo(index.testInput)).toBe(19);
  expect(index.partTwo(['bvwbjplbgvbhsrlpgdmjqwftvncz'])).toBe(23);
  expect(index.partTwo(['nppdvjthqldpwncqszvftbrmjlhg'])).toBe(23);
  expect(index.partTwo(['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'])).toBe(29);
  expect(index.partTwo(['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'])).toBe(26);
})

test("part two", () => {
  expect(index.partTwo(index.input)).toBe(2851);
})
