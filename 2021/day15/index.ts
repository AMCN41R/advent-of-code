import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  "1163751742",
  "1381373672",
  "2136511328",
  "3694931569",
  "7463417111",
  "1319128137",
  "1359912421",
  "3125421639",
  "1293138521",
  "2311944581",
];


logPartOne();

export const partOne = (items: string[]): number => {
  
  // Dijkstra & priority queue

  return 0;
}

log("P1 Result (test):", partOne(testInput)); // expected: 40
// log("P1 Result:", partOne(input)); // answer: 
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  return 0;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 
// log("P2 Result:", partTwo(input)); // answer: 
log();
