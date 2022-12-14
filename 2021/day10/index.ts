import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
  "(((({<>}<{<{<>}{[]{[]{}",
  "[[<[([]))<([[{}[[()]]]",
  "[{[{({}]{}}([{[{{{}}([]",
  "{<[[]]>}<{[{[{[]{()[[[]",
  "[<(<(<(<{}))><([]([]()",
  "<{([([[(<>()){}]>(<<{{",
  "<{([{{}}[<[[[<>{}]]]>[]]",
];

const open = new Set(["(", "{", "[", "<"]);
const close = new Set([")", "}", "]", ">"]);

const closes = (s: string, o: string): boolean => {
  if (!close.has(s)) return false;
  if (!open.has(o)) return false;

  switch (o) {
    case "(": return s === ")";
    case "{": return s === "}";
    case "[": return s === "]";
    case "<": return s === ">";
    default:
      return false;
  }
}

const isIncomplete = (arr: string[]): boolean => {
  const o = arr.filter(x => open.has(x)).length;
  const c = arr.filter(x => close.has(x)).length;

  return o !== c;
}

const isCorrupt = (arr: string[]) => {
  const track: string[] = [];

  for (const i of arr) {
    if (open.has(i)) {
      track.push(i);
      continue;
    }

    if (close.has(i) && closes(i, track[track.length - 1])) {
      track.pop();
      continue;
    }

    return { corrupt: true, char: i, arr };
  }

  return { corrupt: false, char: "", arr };
}

const complete = (arr: string[]): string[] => {
  const track: string[] = [];

  for (const i of arr) {
    if (open.has(i)) track.push(i);
    if (close.has(i)) track.pop();
  }

  return track.reverse().map(x => {
    switch (x) {
      case "(": return ")"
      case "{": return "}"
      case "[": return "]"
      case "<": return ">"
      default:
        throw Error;
    }
  })
}


logPartOne();

export const partOne = (items: string[]): number => {
  const lines = items.map(x => x.split(""));
  const corrupt = lines.map(x => isCorrupt(x)).filter(x => x.corrupt).map(x => x.char);

  const score = corrupt.reduce((sum, i) => {
    switch (i) {
      case ")": return sum + 3
      case "}": return sum + 1197
      case "]": return sum + 57
      case ">": return sum + 25137
      default:
        return sum;
    }
  }, 0);

  return score;
}

log("P1 Result (test):", partOne(testInput)); // expected: 26397
log("P1 Result:", partOne(input)); // answer: 290691
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const lines = items.map(x => x.split(""))
    .map(x => isCorrupt(x))
    .filter(x => !x.corrupt)
    .map(x => x.arr)
    .filter(x => isIncomplete(x));

  const completed = lines.map(x => complete(x));

  const scores = completed.map(x => x.reduce((sum, i) => {
    const t = sum * 5;
    switch (i) {
      case ")": return t + 1
      case "}": return t + 3
      case "]": return t + 2
      case ">": return t + 4
      default:
        return t;
    }
  }, 0)).sort((a, b) => a - b);

  const score = scores[Math.round((scores.length - 1) / 2)];

  return score;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 288957
log("P2 Result:", partTwo(input)); // answer: 2768166558
log();
