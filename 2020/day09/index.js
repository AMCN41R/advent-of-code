const fs = require("fs");
const instructions = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n").map(Number);

const pre = 25;

// part one
console.log("Part One");

const scan = (items, target) => {
  for (let i = 0; i < items.length; i++) {
    const a = items[i];
    for (let j = 0; j < items.length; j++) {
      const b = items[j];
      if (a !== b && a + b === target) return true;
    }
  }
  return false;
}

const process1 = (items) => {
  let pointer = pre + 1;
  while (pointer < items.length) {
    const a = items[pointer];
    const rng = items.slice(pointer - pre, pointer)
    if (!scan(rng, a)) {
      return a;
    }
    pointer++;
  }
  return -1;
}

const result = process1([...instructions]);
console.log("First Invalid Number:", result); // answer: 26796446

// part two
console.log("\nPart Two");
const process2 = (target) => {
  let total = 0;
  for (let i = 0; i < instructions.length; i++) {
    const a = instructions[i];
    for (let j = i + 1; j < instructions.length; j++) {
      const b = instructions[j];
      if (a === b) continue;
      if (a + b + total === target) {
        const rng = instructions.slice(i, j + 1).sort((a, b) => a - b);
        return rng[0] + rng[rng.length - 1];
      };
      total += b;
    }
    total = 0;
  }
}

const result2 = process2(result);
console.log(result2); // answer: 3353494
