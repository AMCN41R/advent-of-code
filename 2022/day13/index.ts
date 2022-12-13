import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '[1,1,3,1,1]',
  '[1,1,5,1,1]',
  '',
  '[[1],[2,3,4]]',
  '[[1],4]',
  '',
  '[9]',
  '[[8,7,6]]',
  '',
  '[[4,4],4,4]',
  '[[4,4],4,4,4]',
  '',
  '[7,7,7,7]',
  '[7,7,7]',
  '',
  '[]',
  '[3]',
  '',
  '[[[]]]',
  '[[]]',
  '',
  '[1,[2,[3,[4,[5,6,7]]]],8,9]',
  '[1,[2,[3,[4,[5,6,0]]]],8,9]',
];

type pair = { id: number, left: any[], right: any[] };

const parse = (items: string[]): pair[] => {
  const pairs = items.map(x => x === '' ? '###' : x)
    .join('|')
    .split('|###|')
    .map((x, i) => {
      const parts = x.split('|');
      return {
        id: i + 1,
        left: JSON.parse(parts[0]),
        right: JSON.parse(parts[1]),
      };
    })

  return pairs;
}

const compare = (left: number | any[], right: number | any[]): 1 | 0 | -1 => {

  // both numbers
  if (!Array.isArray(left) && !Array.isArray(right)) {
    return left < right ? 1 : right < left ? -1 : 0;
  }

  // only LEFT is array
  if (Array.isArray(left) && !Array.isArray(right)) {
    return compare(left, [right]);
  }

  // only RIGHT is array
  if (Array.isArray(right) && !Array.isArray(left)) {
    return compare([left], right);
  }

  const leftArr = left as any[];
  const rightArr = right as any[];

  if (!leftArr.length && rightArr.length) return 1;   // left empty first, right order
  if (leftArr.length && !rightArr.length) return -1;  // right empty first, wrong order
  if (!leftArr.length && !rightArr.length) return 0;  // both empty, check next

  for (let i = 0; i < leftArr.length; i++) {
    const l = leftArr[i];
    const r = rightArr[i];
    if (r === undefined) return -1; // right is empty first, wrong order

    const loopCompare = compare(
      Array.isArray(l) ? l : Number(l),
      Array.isArray(r) ? r : Number(r)
    );

    if (loopCompare !== 0) {
      return loopCompare;
    }
  }

  if (rightArr[leftArr.length]) {
    return 1;
  }

  return 0;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const result = parse(items)
    .map(x => compare(x.left, x.right) === 1 ? x.id : 0)
    .reduce(utils.add, 0);

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 13
log("P1 Result:", partOne(input)); // answer: 6046
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const m1 = '[[2]]';
  const m2 = '[[6]]';

  const sorted = items.concat([m1, m2])
    .filter(x => x !== '')
    .map(x => JSON.parse(x))
    .sort((a, b) => compare(a, b) === -1 ? 1 : -1)
    .map(x => JSON.stringify(x));

  return (sorted.indexOf(m1) + 1) * (sorted.indexOf(m2) + 1);
}

log("P2 Result (test):", partTwo(testInput)); // expected: 140
log("P2 Result:", partTwo(input)); // answer: 21423
log();
