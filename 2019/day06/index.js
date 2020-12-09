const fs = require("fs");
const items = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n");

const com = items.find(x => x.startsWith("COM)"));
items.splice(items.indexOf(com), 1);

const orbit = str => ({ parent: str.split(")")[0], child: str.split(")")[1] });

const totalOrbits = (item, depth) => {
  depth = depth || 1;
  let counter = depth;

  items.filter(x => x.startsWith(`${orbit(item).child})`)).forEach(x => counter += totalOrbits(x, depth + 1));

  return counter;
}

const routeToCom = (child) => {
  const item = items.find(x => orbit(x).child === child);
  if (!item) return [];
  const parent = orbit(item).parent;
  return [parent, ...routeToCom(parent)];
}

const orbitalTransfers = (a, b) => {
  const routeA = routeToCom(a);
  const routeB = routeToCom(b);

  for (let i = 0; i < routeA.length; i++) {
    const idx = routeB.indexOf(routeA[i]);
    if(idx !== -1){
      return idx + i;
    }
  }
}

// part one
console.log("Part One")
console.log("Orbits:", totalOrbits(com)); // answer: 162439

// part one
console.log("\nPart Two")
console.log("Transfers:", orbitalTransfers("YOU", "SAN")); // answer: 367
