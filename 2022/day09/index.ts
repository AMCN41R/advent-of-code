import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'R 4',
  'U 4',
  'L 3',
  'D 1',
  'R 4',
  'D 1',
  'L 5',
  'R 2',
];

export const testInput2: string[] = [
  'R 5',
  'U 8',
  'L 8',
  'D 3',
  'R 17',
  'D 10',
  'L 25',
  'U 20',
];

type Direction = 'U' | 'D' | 'L' | 'R';
type Pos = [number, number];

const getMoves = (items: string[]): { direction: Direction, steps: number }[] => {
  return items.map(x => {
    const parts = x.split(' ');
    return { direction: parts[0] as Direction, steps: Number(parts[1]) }
  })
}

const tailShouldMove = (posT: Pos, posH: Pos): boolean => {
  return (
    Math.abs(posH[0] - posT[0]) > 1 ||
    Math.abs(posH[1] - posT[1]) > 1
  );
}

const moveTail = (posT: Pos, posH: Pos): Pos => {
  if (!tailShouldMove(posT, posH)) {
    return posT;
  }

  const sameRow = posT[0] === posH[0];
  const sameCol = posT[1] === posH[1];

  if (sameRow) return posH[1] > posT[1] ? [posT[0], posT[1] + 1] : [posT[0], posT[1] - 1];
  if (sameCol) return posH[0] > posT[0] ? [posT[0] + 1, posT[1]] : [posT[0] - 1, posT[1]];

  const hAbove = posH[0] < posT[0];
  const hLeft = posH[1] < posT[1];

  const newR = hAbove ? posT[0] - 1 : posT[0] + 1;
  const newC = hLeft ? posT[1] - 1 : posT[1] + 1;

  return [newR, newC];
}


logPartOne();

export const partOne = (items: string[]): number => {
  const moves = getMoves(items);

  const start: Pos = [0, 0];
  const visited: Pos[] = [start];

  let posH: Pos = start;
  let posT: Pos = start;

  const moveU = () => posH = [posH[0] - 1, posH[1]];
  const moveD = () => posH = [posH[0] + 1, posH[1]];
  const moveL = () => posH = [posH[0], posH[1] - 1];
  const moveR = () => posH = [posH[0], posH[1] + 1];

  for (const move of moves) {

    for (let i = 0; i < move.steps; i++) {

      switch (move.direction) {
        case 'U': moveU(); break;
        case 'D': moveD(); break;
        case 'L': moveL(); break;
        case 'R': moveR(); break;
      }

      posT = moveTail(posT, posH);
      visited.push(posT);
    }

  }

  const unique = new Set(visited.map(x => `${x[0]}:${x[1]}`));

  return unique.size;
}

log("P1 Result (test):", partOne(testInput)); // expected: 13
log("P1 Result:", partOne(input)); // answer: 6026
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const moves = getMoves(items);

  const start: Pos = [0, 0];
  const visited: Pos[] = [start];

  let posH: Pos = start;
  let pos1: Pos = start;
  let pos2: Pos = start;
  let pos3: Pos = start;
  let pos4: Pos = start;
  let pos5: Pos = start;
  let pos6: Pos = start;
  let pos7: Pos = start;
  let pos8: Pos = start;
  let pos9: Pos = start;

  const moveU = () => posH = [posH[0] - 1, posH[1]];
  const moveD = () => posH = [posH[0] + 1, posH[1]];
  const moveL = () => posH = [posH[0], posH[1] - 1];
  const moveR = () => posH = [posH[0], posH[1] + 1];

  for (const move of moves) {

    for (let i = 0; i < move.steps; i++) {

      switch (move.direction) {
        case 'U': moveU(); break;
        case 'D': moveD(); break;
        case 'L': moveL(); break;
        case 'R': moveR(); break;
      }

      pos1 = moveTail(pos1, posH);
      pos2 = moveTail(pos2, pos1);
      pos3 = moveTail(pos3, pos2);
      pos4 = moveTail(pos4, pos3);
      pos5 = moveTail(pos5, pos4);
      pos6 = moveTail(pos6, pos5);
      pos7 = moveTail(pos7, pos6);
      pos8 = moveTail(pos8, pos7);
      pos9 = moveTail(pos9, pos8);

      visited.push(pos9);
    }

  }

  const unique = new Set(visited.map(x => `${x[0]}:${x[1]}`));

  return unique.size;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 1
log("P2 Result (test 2):", partTwo(testInput2)); // expected: 36
log("P2 Result:", partTwo(input)); // answer: 2273
log();
