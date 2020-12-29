const fs = require("fs");
const adapters = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n").map(Number).sort((a, b) => a - b);
adapters.push(adapters[adapters.length - 1] + 3);

const result1 = adapters.reduce((a, b) => {
  const x = b - a.prev;
  if (x === 1) return { ...a, prev: b, j1: a.j1 + 1 };
  else if (x === 2) return { ...a, prev: b, j2: a.j2 + 1 };
  else if (x === 3) return { ...a, prev: b, j3: a.j3 + 1 };
  else return { ...a, prev: b };
}, { prev: 0, j1: 0, j2: 0, j3: 0 });

console.log(result1);
console.log(result1.j1 * result1.j3); // answer: 1625

const cache = new Map();
function pathCount(adapters, from) {
  if (cache.has(from)) return cache.get(from);
  let paths = 0;
  for (
    let next = from + 1;
    next < adapters.length && adapters[next] - adapters[from] <= 3;
    next++
  ) {
    paths += pathCount(adapters, next);
  }
  if(!paths) paths = 1;
  cache.set(from, paths);
  return paths;
}

adapters.unshift(0)
cache.clear()
const r2 = pathCount(adapters, 0)
console.log(r2); // answer: 3100448333024