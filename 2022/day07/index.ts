import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '$ cd /',
  '$ ls',
  'dir a',
  '14848514 b.txt',
  '8504156 c.dat',
  'dir d',
  '$ cd a',
  '$ ls',
  'dir e',
  '29116 f',
  '2557 g',
  '62596 h.lst',
  '$ cd e',
  '$ ls',
  '584 i',
  '$ cd ..',
  '$ cd ..',
  '$ cd d',
  '$ ls',
  '4060174 j',
  '8033020 d.log',
  '5626152 d.ext',
  '7214296 k',
];

const getSizes = (items: string[]) => {
  let wd: string[] = [];
  let sizes: { [key: string]: number } = { root: 0 };

  for (const item of items) {
    if (item.startsWith('$ ls')) continue;
    if (item.startsWith('$ cd')) {
      const path = item.replace('$ cd ', '').trim();
      switch (path) {
        case '/':
          wd = ['root']
          break;
        case '..':
          wd.pop();
          break;
        default:
          wd.push(`${wd[wd.length - 1]}/${path}`);
          break;
      }

      continue;
    }

    if (item.startsWith('dir')) {
      const path = item.split(' ')[1];
      const fullPath = `${wd[wd.length - 1]}/${path}`
      if (!(fullPath in sizes)) {
        sizes[fullPath] = 0;
      }
      continue;
    }

    var fileSize = Number(item.split(' ')[0]);

    wd.forEach(x => sizes[x] += fileSize);
  }

  return sizes;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const tree = getSizes(items);

  let result = 0;

  for (const dir in tree) {
    if (Object.prototype.hasOwnProperty.call(tree, dir)) {
      const size = tree[dir];
      if (size <= 100000) {
        result += size;
      }
    }
  }

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 95437
log("P1 Result:", partOne(input)); // answer: 1886043
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const sizes = getSizes(items);

  const max = 70000000;
  const min = 30000000;
  const freeSpace = max - sizes['root'];
  const required = min - freeSpace;

  const values = Object.values(sizes);
  const dir = values.filter(x => x >= required).sort((a, b) => a - b)[0];

  return dir;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 24933642
log("P2 Result:", partTwo(input)); // answer: 3842121
log();
