import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  'Sabqponm',
  'abcryxxl',
  'accszExk',
  'acctuvwj',
  'abdefghi',
];

type pos = { row: number, idx: number };
type canMoveFn = (fromVertex: number, toVertex: number, map: number[][]) => boolean;

const FACTOR = 1e3; // arbitrary; something bigger than max dataset value
const alpha = [...utils.alpha];

const parse = (items: string[]): number[][] => {
  return items.map((row, r) =>
    [...row].map((letter, i) => letter === 'S' ? 0 : letter === 'E' ? 25 : alpha.indexOf(letter)))
}

const canMoveUp: canMoveFn = (vertex: number, next: number, map: number[][]): boolean => {
  try {
    const start = toPoint(vertex);
    const startVal = map[start.row][start.idx];

    const step = toPoint(next);
    const stepVal = map[step.row][step.idx];

    return stepVal <= startVal + 1;

  } catch (error) {
    return false;
  }
}

const canMoveDown: canMoveFn = (vertex: number, next: number, map: number[][]): boolean => {
  try {
    const start = toPoint(vertex);
    const startVal = map[start.row][start.idx];

    const step = toPoint(next);
    const stepVal = map[step.row][step.idx];

    return stepVal >= (startVal - 1);

  } catch (error) {
    return false;
  }
}

const findNode = (node: string, items: string[]): pos => {
  for (let i = 0; i < items.length; i++) {
    const e = items[i];
    const idx = e.indexOf(node);
    if (idx === -1) continue;
    return { row: i, idx };
  }
  return { row: -1, idx: -1 };
}

const toVertex = (pos: pos): number => (pos.row * FACTOR) + pos.idx;
const toPoint = (vertex: number) => ({ row: Math.floor(vertex / FACTOR), idx: vertex % FACTOR });

// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
const dijkstra = (map: number[][], startVertex: number, endVertex: number, canMove: canMoveFn) => {

  /**
  for each vertex v in Graph.Vertices:
      dist[v] ← INFINITY
      prev[v] ← UNDEFINED
      add v to Q
  dist[source] ← 0
  */
  const dist: { [key: number]: number } = {};
  const prev: { [key: number]: number } = {};
  let queue: number[] = [];

  for (let r = 0; r < map.length; r++) {
    const row = map[r];
    for (let i = 0; i < row.length; i++) {
      const letter = row[i];
      const v = toVertex({ row: r, idx: i });
      dist[v] = Infinity;
      // prev[v] = undefined; // not required in JS as undefined by default
      queue.push(v);
    }
  }

  dist[startVertex] = 0;

  /**
  while Q is not empty:
      u ← vertex in Q with min dist[u]
      // can break here if only looking for the shortest path with:
      // if u = target; return dist[u]
      remove u from Q

      for each neighbor v of u still in Q:
          alt ← dist[u] + Graph.Edges(u, v)
          if alt < dist[v]:
              dist[v] ← alt
              prev[v] ← u
  */
  while (queue.length > 0) {
    let u: number = Infinity;
    for (const vertex of queue) {
      if (u === Infinity || dist[vertex] < dist[u]) {
        u = vertex;
      }
    }

    // break early as we are only looking for the shortest path
    const uPos = toPoint(u);
    if (u === endVertex || map[uPos.row][uPos.idx] === endVertex) {
      return dist[u];
    }

    queue = queue.filter(x => x !== u);

    [ // neighbors
      u - FACTOR,
      u + FACTOR,
      u - 1,
      u + 1,
    ].forEach(v => {
      if (canMove(u, v, map) && queue.includes(v)) {
        // Graph.edges = 1 because the distance between 2 nodes in our scenario is always 1
        // (ie: 1 step)
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    });

  }

  /**
  return dist[], prev[]
  */
  // return { dist, prev };
  return -1;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const start = findNode('S', items);
  const end = findNode('E', items);
  const map = parse(items);

  const result = dijkstra(map, toVertex(start), toVertex(end), canMoveUp);

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 31
log("P1 Result:", partOne(input)); // answer: 440
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const end = findNode('E', items);
  const map = parse(items);

  const result = dijkstra(map, toVertex(end), 0, canMoveDown);

  return result;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 29
log("P2 Result:", partTwo(input)); // answer: 439
log();
