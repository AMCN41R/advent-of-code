const fs = require("fs");
const content = fs.readFileSync("input.txt", "utf-8").split("\r\n");
const l1 = content[0].split(",");
const l2 = content[1].split(",");

const draw = (line) => {
  const obj = {};
  let pos = "0.0";
  let r_dist = 0;
  for (const step of line) {
    const [x, y] = pos.split(".");
    const dist = Number(step.substring(1));
    for (let i = 1; i <= dist; i++) {
      let p;
      r_dist += 1
      switch (step[0]) {
        case "U":
          p = `${x}.${Number(y) + i}`;
          break;

        case "D":
          p = `${x}.${Number(y) - i}`;
          break;

        case "L":
          p = `${Number(x) - i}.${y}`;
          break;

        case "R":
          p = `${Number(x) + i}.${y}`;
          break;

        default:
          break;
      }

      if (!obj[p]) {
        obj[p] = r_dist;
      }
      pos = p;
    }
  }
  return obj;
}

const getIntersects = (obj1, obj2) => {
  const result = [];

  for (const key in obj1) {
    if (obj2[key]) {
      result.push({ pos: key, distA: obj1[key], distB: obj2[key] });
    }
  }

  return result;
}

console.log("Drawing line 1");
const points1 = draw(l1);

console.log("Drawing line 2");
const points2 = draw(l2);

console.log("Intersecting...");
const intersects = getIntersects(points1, points2);
console.log("Intersections:", intersects.length);

// part one
console.log("\nPart One");
const result1 = intersects.map(x => {
  const [a, b] = x.pos.split(".");
  return Math.abs(Number(a)) + Math.abs(Number(b))
})
  .sort((a, b) => a - b);

console.log("Closest:", result1[0]); // answer: 352

// part two
console.log("\nPart Two");
const result2 = intersects.map(x => x.distA + x.distB).sort((a, b) => a - b);
console.log("Shortest:", result2[0]);
