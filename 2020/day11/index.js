const fs = require("fs");
const content = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "");

const pass1 = content.replace(/L/gi, "#");

const l = pass1.indexOf("\n");
console.log("DEL:", l)

const occSet = (i) => {
  const m = i % l;
  if (m === 0) return [i - l, i - (l - 1), i + 1, i + l, i + (l + 1)];
  if (m === l - 1) return [i - (l + 1), i - l, i - 1, i + (l - 1), i + l];
  return [
    i - (l + 1),
    i - l,
    i - (l - 1),
    i - 1,
    i + 1,
    i + (l - 1),
    i + l,
    i + (l + 1)
  ];
}

const pass = (ln) => {
  const arr = [...ln];
  const n = arr.length;
  const newLine = arr.map((x, i) => {
    if (x === ".") return x;
    const occ = occSet(i).reduce((a, b) => b >= 0 && b < n && arr[b] === "#" ? a + 1 : a, 0);
    if (x === "L" && occ === 0) return "#";
    if (x === "#" && occ >= 4) return "L";
    return x;
  });
  return newLine.join("");
};

const occupied = (ln) => (ln.match(/#/g) || []).length;

let line = pass1.replace(/\n/g, "");
// console.log("##", line);

let lastCount = 0;
let passes = 1;
while (true) {
  passes++;
  line = pass(line);
  const o = occupied(line);
  // console.log(o, line);
  console.log(o);

  if (o === lastCount) {
    lastCount = o;
    break;
  } else {
    lastCount = o;
  }
}

// part one
console.log("PART ONE");
console.log("PASSES", passes);
console.log("OCCUPIED", lastCount); // answer: 2483

// part two
console.log("\nPART TWO");

