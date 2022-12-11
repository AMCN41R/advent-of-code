import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'Monkey 0:',
  '  Starting items: 79, 98',
  '  Operation: new = old * 19',
  '  Test: divisible by 23',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 3',
  '',
  'Monkey 1:',
  '  Starting items: 54, 65, 75, 74',
  '  Operation: new = old + 6',
  '  Test: divisible by 19',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 0',
  '',
  'Monkey 2:',
  '  Starting items: 79, 60, 97',
  '  Operation: new = old * old',
  '  Test: divisible by 13',
  '    If true: throw to monkey 1',
  '    If false: throw to monkey 3',
  '',
  'Monkey 3:',
  '  Starting items: 74',
  '  Operation: new = old + 3',
  '  Test: divisible by 17',
  '    If true: throw to monkey 0',
  '    If false: throw to monkey 1',
];

type mk = {
  id: number;
  items: number[];
  opParts: string[];
  divTest: number;
  ifTrue: number;
  ifFalse: number;
  inspections: number;
};

const getOp = (n: number, opParts: string[], mulMod: number, manage?: (r: number) => number): () => number => {
  const a = opParts[0] === 'old' ? n : Number(opParts[0]);
  const b = opParts[2] === 'old' ? n : Number(opParts[2]);

  let f: () => number;

  switch (opParts[1]) {
    case '+': f = () => a + b; break;
    case '*': f = () => (a * b) % mulMod; break;
    default: f = () => -1; break;
  }

  return manage
    ? () => manage(f())
    : f;
}

const parseMk = (lines: string[]): mk => {
  const id = Number(lines[0].replace('Monkey ', '').replace(':', ''));
  const items = lines[1].trim().replace('Starting items: ', '').split(', ').map(Number);
  const opParts = lines[2].trim().replace('Operation: new = ', '').split(' ');
  const divTest = Number(lines[3].trim().replace('Test: divisible by ', ''));
  const ifTrue = Number(lines[4].trim().replace('If true: throw to monkey ', ''));
  const ifFalse = Number(lines[5].trim().replace('If false: throw to monkey ', ''));
  return { id, items, opParts, divTest, ifTrue, ifFalse, inspections: 0 };
}

const parse = (items: string[]): mk[] => {
  const mks = items.map(x => x === '' ? '#BR#' : x)
    .join('|')
    .split('|#BR#|')
    .map(x => x.split('|'))
    .map(parseMk);

  //console.log(mks);

  return mks;
}

const execute = (items: string[], rounds: number, manage?: (r: number) => number): number => {
  const mks = parse(items);

  const mm = mks.map(x => x.divTest).reduce((prev, next) => prev * next);

  for (let round = 1; round <= rounds; round++) {
    for (const mk of mks) {
      while (mk.items.length > 0) {

        const item = mk.items.shift();
        if (!item) continue;

        mk.inspections += 1;

        const operation = getOp(item, mk.opParts, mm, manage);
        const newWorry = operation();

        if (newWorry % mk.divTest === 0) {
          mks[mk.ifTrue].items.push(newWorry);
        } else {
          mks[mk.ifFalse].items.push(newWorry);
        }
      }
    }
  }

  const sorted = mks.sort((a, b) => b.inspections - a.inspections);
  const result = sorted[0].inspections * sorted[1].inspections;

  return result;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const result = execute(items, 20, n => Math.floor(n / 3));
  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 10605
log("P1 Result:", partOne(input)); // answer: 101436
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const result = execute(items, 10000);
  return result;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 2713310158
log("P2 Result:", partTwo(input)); // answer: 19754471646
log();
