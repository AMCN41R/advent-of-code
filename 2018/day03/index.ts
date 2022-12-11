import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  '#1 @ 1,3: 4x4',
  '#2 @ 3,1: 4x4',
  '#3 @ 5,5: 2x2',
];

type pos = [number, number];
type claim = { id: number, corner: pos, width: number, height: number };

const parse = (items: string[]): claim[] => {
  return items.map(x => {
    const parts = x.split(' ');

    const corner = parts[2].split(',');
    const size = parts[3].split('x');

    return {
      id: Number(parts[0].replace('#', '')),
      corner: [Number(corner[0]), Number(corner[1].replace(':', ''))],
      width: Number(size[0]),
      height: Number(size[1])
    };
  });
}


logPartOne();

export const partOne = (items: string[]): number => {
  const claims = parse(items);

  const used = new Set<string>();
  const repeats = new Set<string>();

  claims.forEach(claim => {

    for (let h = 0; h < claim.height; h++) {
      for (let w = 0; w < claim.width; w++) {
        const p: pos = [claim.corner[0] + w, claim.corner[1] + h];
        const ps = `${p[0]}:${p[1]}`;

        if (used.has(ps)) {
          repeats.add(ps);
        } else {
          used.add(ps);
        }
      }
    }

  })

  return repeats.size;
}

log("P1 Result (test):", partOne(testInput)); // expected: 4
log("P1 Result:", partOne(input)); // answer: 118539
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const claims = parse(items);

  const used: { [key: string]: claim } = {};
  const repeaters = new Set<number>();

  claims.forEach(claim => {

    for (let h = 0; h < claim.height; h++) {
      for (let w = 0; w < claim.width; w++) {
        const p: pos = [claim.corner[0] + w, claim.corner[1] + h];
        const ps = `${p[0]}:${p[1]}`;

        if (used[ps]) {
          repeaters.add(claim.id);
          repeaters.add(used[ps].id);
        } else {
          used[ps] = claim;
        }
      }
    }

  });

  const result = claims.map(x => x.id).filter(x => ![...repeaters].includes(x));

  return result[0];
}

log("P2 Result (test):", partTwo(testInput)); // expected: 3
log("P2 Result:", partTwo(input)); // answer: 1270
log();
