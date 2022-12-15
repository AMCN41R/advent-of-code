import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
  'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
  'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
  'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
  'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
  'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
  'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
  'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
  'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
  'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
  'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
  'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
  'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
  'Sensor at x=20, y=1: closest beacon is at x=15, y=3',
];

type point = [number, number];
type sensor = { dist: number, sensor: point, beacon: point };

const key = (p: point): string => `${p[0]}#${p[1]}`;
const dist = (a: point, b: point): number => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const parse = (items: string[]) => {
  let minX: number | null = null;

  const points = items.map(item => {
    const [s, b] = item.split(': ');
    const sensor = s.replace('Sensor at ', '')
      .split(', ').map(p => Number(p.split('=')[1])) as point;
    if (minX === null || sensor[0] < minX) minX = sensor[0];

    const beacon = b.replace('closest beacon is at ', '')
      .split(', ').map(p => Number(p.split('=')[1])) as point;
    if (minX === null || beacon[0] < minX) minX = beacon[0];

    return { sensor, beacon }
  });

  return {
    points: points.map(x => ({ ...x, dist: dist(x.sensor, x.beacon) })),
    minX: Number(minX),
  }
}

const isCovered = (p: point, points: sensor[]): boolean => {
  for (const point of points) {
    const d = dist(p, point.sensor);
    if (d <= point.dist) {
      return true;
    }
  }
  return false;
}

const run = (
  points: sensor[],
  minX: number,
  ln: number
): number => {

  const sb = new Set<string>(
    points.map(x => [x.sensor, x.beacon])
      .flat()
      .map(key)
  );

  const nope = new Set<string>();

  let x = minX;
  while (true) {
    const p: point = [x, ln];

    const covered = isCovered(p, points);
    if (covered) {
      if (!sb.has(key(p))) {
        nope.add(key(p));
      }

      x++;
      continue;
    }

    break;
  }

  x = minX - 1;
  while (true) {
    const p: point = [x, ln];

    const covered = isCovered(p, points);
    if (covered) {
      if (!sb.has(key(p))) {
        nope.add(key(p));
      }

      x--;
      continue;
    }

    break;
  }

  return nope.size;
}

const getPerimeter = (sensor: sensor): point[] => {
  const s = sensor.sensor;
  const dist = sensor.dist;

  const BR = Array.from({ length: dist + 2 }, (_, i) => [s[0] + i, s[1] + (dist + 1) - i] as point);
  const BL = Array.from({ length: dist + 2 }, (_, i) => [s[0] - i, s[1] + (dist + 1) - i] as point);

  const TR = Array.from({ length: dist + 2 }, (_, i) => [s[0] + i, s[1] + (dist - 1) + i] as point);
  const TL = Array.from({ length: dist + 2 }, (_, i) => [s[0] - i, s[1] + (dist - 1) + i] as point);

  return [...new Set([...BR, ...BL, ...TR, ...TL].map(key))].map(x => x.split('#').map(Number) as point);
}


logPartOne();

export const partOne = (items: string[], ln: number): number => {
  const data = parse(items);
  const result = run(data.points, data.minX, ln);

  return result;
}

log("P1 Result (test):", partOne(testInput, 10)); // expected: 26
log("P1 Result:", partOne(input, 2e6)); // answer: 4793062
log();


logPartTwo();

export const partTwo = (items: string[], max: number): number => {
  const data = parse(items);

  const inRange = (p: point): boolean => p[0] >=0 && p[0] <=max && p[1] >=0 && p[1] <=max

  for (const sensor of data.points) {
    const perimeter = getPerimeter(sensor);
    for (const p of perimeter) {
      if (inRange(p) && !isCovered(p, data.points)) {
        return (p[0] * 4e6) + p[1];
      }
    }
  }


  return 0;
}

log("P2 Result (test):", partTwo(testInput, 20)); // expected: 56000011
log("P2 Result:", partTwo(input, 4e6)); // answer: 10826395253551
log();
