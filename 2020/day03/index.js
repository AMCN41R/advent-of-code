const fs = require("fs");

const content = fs.readFileSync("input.txt", "utf-8");
const lines = content.split("\r\n");

const getTrees = (moveRight, moveDown) => {
  let trees = 0;
  for (let i = 1; i < lines.length; i += moveDown) {
    const idx = (i * moveRight) % lines[0].length;
    if (lines[i][idx] === "#") {
      trees++;
    }
  }

  return trees;
}

// part one
console.log("Part One");
console.log("Trees Hit:", getTrees(3, 1)); // answer: 218

// part two
console.log("\nPart Two");
console.log("Trees Hit...");

const product = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].reduce((a, b) => {
  const [x, y] = b;
  const result = getTrees(x, y);
  console.log(`  R${x}D${y}:`, result);
  return a * result;
}, 1);

console.log("Product...");
console.log(`  ${product}`); // answer: 3847183340
