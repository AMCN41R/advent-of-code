const fs = require("fs");

var content = fs.readFileSync("input.txt", "utf-8");
var lines = content.split("\r\n");
console.log("Total Passwords:", lines.length);

const info = lines.map(x => {
  const parts = x.split(": ");
  const rules = parts[0].split(" ");
  const range = rules[0].split("-");

  return {
    password: parts[1],
    letter: rules[1],
    upper: range[1],
    lower: range[0]
  }
});

const rule1 = info.filter(x => {
  const occurs = x.password.split(x.letter).length -1;
  return occurs <= x.upper && occurs >= x.lower;
});

const rule2 = info.filter(x =>
  x.password[x.lower-1] === x.letter ^ x.password[x.upper-1] === x.letter)
  
console.log("Valid Rule 1:", rule1.length);
console.log("Valid Rule 2:", rule2.length);
