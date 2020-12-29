const fs = require("fs");
const lines = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n")
  .map(x => [x.substring(0, 1), Number(x.substring(1))]);

let direction = "E";
let xTotal = 0;
let yTotal = 0;

const getDirection = (d) => {
  if (d === "N") return 1;
  if (d === "S") return 2;
  if (d === "E") return 3;
  if (d === "W") return 4;
}

const getMovement = (m) => {
  if (m === 0 || m === 360) return 0;
  if (m === 90) return 1;
  if (m === 180) return 2;
  if (m === 270) return 3;
}

const move = (n, d) => {
  if (d || direction === 1) y += n; // N
  if (d || direction === 3) y -= n; // S
  if (d || direction === 2) x += n; // E
  if (d || direction === 4) x += n; // W
}

const rotate = (n, d) => {
  if (d === "R") 
}

lines.forEach(x => {
  const [d, n] = x;

  if (d === "F") move(n);
  else if (d === "R");
  else if (d === "L") x += n;
  else move(n, getDirection(d));
})



