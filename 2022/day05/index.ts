import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '    [D]',
  '[N] [C]',
  '[Z] [M] [P]',
  ' 1   2   3',
  '',
  'move 1 from 2 to 1',
  'move 3 from 1 to 3',
  'move 2 from 2 to 1',
  'move 1 from 1 to 2',
];

const unbox = (str: string) => str.replace('[', '').replace(']', '')

const getMove = (move: string) => {
  const parts = move.split(' ');
  return {
    move: Number(parts[1]),
    from: Number(parts[3]),
    to: Number(parts[5]),
  }
}

const createQueues = (dock: string[]): string[][] => {
  const queues: string[][] = [];

  const stacks = dock.pop()?.trim().split('   ').map(Number).pop() ?? 0;
  for (let i = 0; i < stacks; i++) {
    queues.push([]);
  }

  while (dock.length > 0) {
    const next = dock.pop() ?? '';
    const crates = utils.chunk([...next], 4).map(x => x.join('').trim())
    for (let i = 0; i < crates.length; i++) {
      const e = crates[i];
      if (e.trim() !== '') {
        queues[i] && queues[i].push(e);
      }
    }
  }

  return queues;
}


logPartOne();

export const partOne = (items: string[]): string => {
  const dock = items.slice(0, items.indexOf(''));
  const moves = items.slice(items.indexOf('') + 1).map(getMove);

  const stacks = createQueues(dock);

  moves.forEach(m => {
    for (let i = 0; i < m.move; i++) {
      stacks[m.to - 1].push(stacks[m.from - 1].pop() ?? '');
    }
  });

  const result = stacks.map(x => x.pop() ?? '').map(unbox).join('');

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: CMZ
log("P1 Result:", partOne(input)); // answer: LJSVLTWQM
log();


logPartTwo();

export const partTwo = (items: string[]): string => {
  const dock = items.slice(0, items.indexOf(''));
  const moves = items.slice(items.indexOf('') + 1).map(getMove);

  const stacks = createQueues(dock);

  moves.forEach(m => {
    const crates = stacks[m.from - 1].splice(stacks[m.from - 1].length - m.move);
    stacks[m.to - 1].push(...crates);
  });

  const result = stacks.map(x => x.pop() ?? '').map(unbox).join('');

  return result;
}

log("P2 Result (test):", partTwo(testInput)); // expected: MCD
log("P2 Result:", partTwo(input)); // answer: BRQWDBBJM
log();
