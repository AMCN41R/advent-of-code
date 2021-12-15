const fs = require("fs");
const lines = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n");

const testLines = [
  "F10",
  "N3",
  "F7",
  "R90",
  "F11"
];

const getDirection = (d) => {
  if (d === 0 || d === 360) return "N";
  if (d === 90) return "E";
  if (d === 180) return "S";
  if (d === 270) return "W";
}

const move = (v, d, pos) => {
  let { x, y } = pos;

  if (d === "N") y = y + v;
  if (d === "S") y = y - v;
  if (d === "E") x = x + v;
  if (d === "W") x = x - v;

  return { x, y };
}

partOne = (input) => {
  let d = 90;
  let pos = { x: 0, y: 0 };

  for (const i of input) {
    const m = i.substring(0, 1);
    const v = Number(i.substring(1));

    switch (m) {
      case "N":
      case "S":
      case "E":
      case "W":
        pos = move(v, m, pos);
        break;

      case "F":
        pos = move(v, getDirection(d), pos);
        break;

      case "R":
        d = d + v <= 360 ? d + v : d + v - 360;
        break;

      case "L":
        d = d - v >= 0 ? d - v : d - v + 360;
        break;
    }
  }

  const result = Math.abs(pos.x) + Math.abs(pos.y);
  console.log(pos, result);
}

console.log("PART ONE")
partOne(testLines); // expected: 25
partOne(lines); // answer: 562


partTwo = (input) => {
  let pos = { x: 0, y: 0 };
  let w = { x: 10, y: 1 };

  for (const i of input) {
    const m = i.substring(0, 1);
    const v = Number(i.substring(1));

    switch (m) {
      case "N":
      case "S":
      case "E":
      case "W":
        w = move(v, m, w);
        break;

      case "F":
        if (w.y >= 0) pos = move(Math.abs(w.y) * v, "N", pos);
        else if (w.y < 0) pos = move(Math.abs(w.y) * v, "S", pos);

        if (w.x >= 0) pos = move(Math.abs(w.x) * v, "E", pos);
        else if (w.x < 0) pos = move(Math.abs(w.x) * v, "W", pos);

        break;

      case "R":
        if (v === 90) w = { x: w.y, y: w.x * -1 };
        if (v === 180) w = { x: w.x * -1, y: w.y * -1 };
        if (v === 270) w = { x: w.y * -1, y: w.x };
        break;

      case "L":
        if (v === 90) w = { x: w.y * -1, y: w.x };
        if (v === 180) w = { x: w.x * -1, y: w.y * -1 };
        if (v === 270) w = { x: w.y, y: w.x * -1 };
        break;
    }
  }

  const result = Math.abs(pos.x) + Math.abs(pos.y);
  console.log(pos, result);
}

console.log();
console.log("PART TWO");
partTwo(testLines); // expected: 286
partTwo(lines); // answer: 101860
