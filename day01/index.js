const fs = require("fs");

var content = fs.readFileSync("input.txt", "utf-8");
var lines = content.split("\r\n").map(Number);
console.log("Total Records:", lines.length);

const report1 = () => {
  let a, b;

  for (let i = 0; i < lines.length; i++) {
    const e = lines[i];
    const f = lines.find(x => x == 2020 - e);
    if (f) {
      a = e;
      b = f;
      break;
    }
  }

  console.log("REPORT 1", "| A:", a, "| B:", b, "| SUM:", a + b, "| RESULT:", a * b);
};

const report2 = () => {
  let a, b, c;

  for (let i = 0; i < lines.length; i++) {
    const e = lines[i];
    for (let j = i + 1; j < lines.length; j++) {
      const f = lines[j];
      const g = lines.find(x => x == 2020 - (e + f));
      if (g) {
        a = e;
        b = f;
        c = g;
        break;
      }
    }
  }

  console.log("REPORT 2", "| A:", a, "| B:", b, "| C:", c, "| SUM:", a + b + c, "| RESULT:", a * b * c);
};

report1();
report2();