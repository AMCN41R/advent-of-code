import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
  "",
  "22 13 17 11  0",
  " 8  2 23  4 24",
  "21  9 14 16  7",
  " 6 10  3 18  5",
  " 1 12 20 15 19",
  "",
  " 3 15  0  2 22",
  " 9 18 13 17  5",
  "19  8  7 25 23",
  "20 11 10 24  4",
  "14 21 16 12  6",
  "",
  "14 21 17 24  4",
  "10 16 15  9 19",
  "18  8 23 26 20",
  "22 11 13  6  5",
  "2  0 12  3  7",
];

class Board {
  constructor(rows: string[][]) {
    this.numbers = rows.flat(1);
    this.rows = rows.map(x => new Set([...x]));
    this.cols = [];
    for (let i = 0; i < 5; i++) {
      this.cols.push(new Set([...rows.map(x => x[i])]));
    }
  }

  private rows: Set<string>[];
  private cols: Set<string>[];
  private numbers: string[];
  private hits: string[] = [];

  isWinner(n: string): boolean {
    this.hits.push(n);
    for (const i of this.rows) {
      if (i.has(n)) {
        i.delete(n);
        if (i.size === 0) {
          return true;
        }
      }
    }
    for (const i of this.cols) {
      if (i.has(n)) {
        i.delete(n);
        if (i.size === 0) {
          return true;
        }
      }
    }
    return false;
  }

  score(): number {
    const n = Number(this.hits[this.hits.length - 1]);
    const left = this.numbers.filter(x => this.hits.indexOf(x) === -1);
    return left.map(Number).reduce((tot, next) => tot + next, 0) * n;
  }
}

const getBoards = (items: string[]): { numbers: string[], boards: Board[] } => {

  const numbers = items.slice(0, 1)[0].split(",");

  const boards = utils.chunk(
    items.slice(2)
      .filter(x => x !== "")
      .map((x) => x.replace(/  +/g, " ").trim().split(" ")),
    5)
    .map(x => new Board(x));

  return { numbers, boards };
}


logPartOne();

export const partOne = (items: string[]) => {
  const { numbers, boards } = getBoards(items);

  for (const n of numbers) {
    for (const b of boards) {
      if (b.isWinner(n)) {
        return b.score();
      }
    }
  }

  return 0;
}

log("P1 Score (test):", partOne(testInput)); // expected: 4512
log("P1 Score:", partOne(input)); // answer: 38594
log();


logPartTwo();

export const partTwo = (items: string[]) => {
  let { numbers, boards } = getBoards(items);

  let winners: Set<Board> = new Set<Board>();

  for (const n of numbers) {
    for (const b of boards) {
      if (b.isWinner(n) && !winners.has(b)) {
        winners.add(b);

        if (winners.size === boards.length){
          return b.score();
        }
      }
    }
  }

  return 0;
}

log("P2 Score (test):", partTwo(testInput)); // expected: 1924
log("P2 Score:", partTwo(input)); // answer: 21184
log();
