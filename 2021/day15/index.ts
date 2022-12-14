import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "/input.txt");

export const testInput: string[] = [
  "1163751742",
  "1381373672",
  "2136511328",
  "3694931569",
  "7463417111",
  "1319128137",
  "1359912421",
  "3125421639",
  "1293138521",
  "2311944581",
];

const parse = (items: string[]): number[][] => items.map(x => [...x].map(Number));

type pos = { row: number, idx: number };
const FACTOR = 1e3; // arbitrary; something bigger than max dataset value
const toVertex = (pos: pos): number => (pos.row * FACTOR) + pos.idx;
const toPoint = (vertex: number) => ({ row: Math.floor(vertex / FACTOR), idx: vertex % FACTOR });

const canMove = (vertex: number, next: number, map: number[][]): boolean => {
  try {
    const start = toPoint(vertex);
    const startVal = map[start.row][start.idx];

    const step = toPoint(next);
    const stepVal = map[step.row][step.idx];

    return true;
  } catch (error) {
    return false;
  }
}

// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
const dijkstra = (map: number[][], startVertex: number, endVertex: number) => {

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
        // Graph.edges(u, v) = the risk score of the neighbor vertex
        const vPoint = toPoint(v);
        const edge = map[vPoint.row][vPoint.idx];
        const alt = dist[u] + edge;
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

const dijkstraPriority = (map: number[][], startVertex: number, endVertex: number) => {
  /**
    dist[source] ← 0                           // Initialization

    create vertex priority queue Q
  */
  const dist: { [key: number]: number } = {};
  const prev: { [key: number]: number } = {};

  const queue: utils.PriorityQueue<number> = new utils.PriorityQueue<number>();

  /**
    for each vertex v in Graph.Vertices:
        if v ≠ source
            dist[v] ← INFINITY                 // Unknown distance from source to v
            prev[v] ← UNDEFINED                // Predecessor of v

        Q.add_with_priority(v, dist[v])
  */
  for (let r = 0; r < map.length; r++) {
    const row = map[r];
    for (let i = 0; i < row.length; i++) {
      const risk = row[i];
      const v = toVertex({ row: r, idx: i });
      if (v !== startVertex) {
        dist[v] = Infinity;
        // prev[v] = undefined; // not required in JS as undefined by default
      }

      queue.enqueue({ value: v, priority: dist[v] });
    }
  }

  dist[startVertex] = 0;

  /**
     while Q is not empty:                      // The main loop
         u ← Q.extract_min()                    // Remove and return best vertex
         for each neighbor v of u:              // Go through all v neighbors of u
             alt ← dist[u] + Graph.Edges(u, v)
             if alt < dist[v]:
                 dist[v] ← alt
                 prev[v] ← u
                Q.decrease_priority(v, alt)
  */
  while (queue.size() > 0) {
    let u = queue.dequeue()?.value ?? -1;

    if (u === endVertex) {
      return dist[u];
    }

    [ // neighbors
      u - FACTOR,
      u + FACTOR,
      u - 1,
      u + 1,
    ].forEach(v => {
      if (canMove(u, v, map)) {
        // Graph.edges(u, v) = the risk score of the neighbor vertex
        const vPoint = toPoint(v);
        const edge = map[vPoint.row][vPoint.idx];
        let alt = dist[u] + edge;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
          queue.decrease(v, alt);
        }
      }
    });
  }

  /**
     return dist, prev
   */
  //console.log(dist)
  return dist[endVertex];
}


logPartOne();

export const partOne = (items: string[]): number => {
  const start: pos = { row: 0, idx: 0 };
  const end: pos = { row: items.length - 1, idx: items[0].length - 1 }
  const map = parse(items);

  // const result = dijkstra(map, toVertex(start), toVertex(end));
  const result = dijkstraPriority(map, toVertex(start), toVertex(end));

  return result;
}

log("P1 Result (test):", partOne(testInput)); // expected: 40
log("P1 Result:", partOne(input)); // answer: 487
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  let map = parse(items);

  map = map.map(x => {

    let a = x;
    let last = x
    for (let i = 0; i < 4; i++) {
      const current = last.map(n => n === 9 ? 1 : n + 1);
      a = a.concat(current);
      last = current;
    }
    return a;
  });

  let last2 = map;
  for (let i = 0; i < 4; i++) {
    const current2 = last2.map(x => {

      const inc = x.map(n => n === 9 ? 1 : n + 1);
      map.push(inc);
      return inc;
    });
    last2 = current2;
  };

  const start: pos = { row: 0, idx: 0 };
  const end: pos = { row: map.length - 1, idx: map[0].length - 1 }

  // TODO: SLOW! needs priority queue?
  //const result = dijkstra(map, toVertex(start), toVertex(end));

  // TODO: Quicker, but still SLOW!
  const result = dijkstraPriority(map, toVertex(start), toVertex(end));

  // console.log(map.map(x => x.join('')));

  return result;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 315
// log("P2 Result:", partTwo(input)); // answer: 2821
log();
