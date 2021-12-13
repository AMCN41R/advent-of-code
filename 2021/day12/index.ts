import * as utils from "../utils";
const { logPartOne, logPartTwo, has } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  "dc-end",
  "HN-start",
  "start-kj",
  "dc-start",
  "dc-HN",
  "LN-dc",
  "HN-end",
  "kj-sa",
  "kj-HN",
  "kj-dc",
];

type Graph = { [key: string]: string[] };

const isSmallCave = (str: string): boolean => str === str.toLowerCase();

const makeGraph = (items: string[][]): Graph => {
  return items.reduce((g, i) => {
    const [from, to] = i;
    if (!g[from]) g[from] = [];
    g[from].push(to);

    if (!g[to]) g[to] = [];
    g[to].push(from);

    return g;
  }, {} as Graph);
}

const dfs = (graph: Graph, node: string, visited: string[], paths: string[]): string[] => {
  visited.push(node);
  if (node === "end") {
    paths.push(visited.join(","));
    return paths;
  }

  for (const child of graph[node]) {
    if (isSmallCave(child) && visited.includes(child)) continue;
    dfs(graph, child, [...visited], paths);
  }

  return paths;
}

const dfs2 = (graph: Graph, node: string, visited: string[], paths: string[], smallCaveVisitedTwice: boolean): string[] => {
  visited.push(node);
  if (node === "end") {
    paths.push(visited.join(","));
    return paths;
  }

  for (const child of graph[node]) {
    if (child === "start") continue;
    if (isSmallCave(child) && visited.includes(child)) {
      if (smallCaveVisitedTwice) continue;
      dfs2(graph, child, [...visited], paths, true);
    }
    else {
      dfs2(graph, child, [...visited], paths, smallCaveVisitedTwice);
    }
  }

  return paths;
}


logPartOne();

export const partOne = (items: string[]): number => {
  const links = items.map(x => x.split("-"));
  const graph = makeGraph(links);
  const result = dfs(graph, "start", [], []);

  return result.length;
}

log("P1 Result (test):", partOne(testInput)); // expected: 19
log("P1 Result:", partOne(input)); // answer: 5958
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  const links = items.map(x => x.split("-"));
  const graph = makeGraph(links);
  const result = dfs2(graph, "start", [], [], false);

  return result.length;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 103
log("P2 Result:", partTwo(input)); // answer: 150426
log();
