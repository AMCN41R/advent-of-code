import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
];

const detect = (data: string[], markerLength: number) => {
  const buffer: string[] = [];

  let marker = 0;

  for (let i = 0; i < data.length; i++) {
    const byte = data[i];

    if (buffer.length < markerLength) {
      buffer.push(byte);
      continue;
    }

    buffer.splice(0, 1);
    buffer.push(byte);
    if (new Set(buffer).size === markerLength) {
      marker = i + 1;
      break;
    }
  }

  return marker;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const data = [...items[0]];
  const marker = detect(data, 4)

  return marker;
}

log("P1 Result (test):", partOne(testInput)); // expected: 7
log("P1 Result:", partOne(input)); // answer: 1794
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const data = [...items[0]];
  const marker = detect(data, 14)

  return marker;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 19
log("P2 Result:", partTwo(input)); // answer: 2851
log();
