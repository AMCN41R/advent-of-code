const fs = require("fs");

var content = fs.readFileSync("input.txt", "utf-8");
var lines = content.split("\r\n").map(Number);
console.log("Total Records:", lines.length);

const report1 = () => {
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i];
    const b = lines.find(x => x == 2020 - a);
    if (b) {
      console.log("REPORT 1", "| A:", a, "| B:", b, "| SUM:", a + b, "| RESULT:", a * b);
      return;
    }
  }
};

const report2 = () => {
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i];
    for (let j = i + 1; j < lines.length; j++) {
      const b = lines[j];
      const c = lines.find(x => x == 2020 - (a + b));
      if (c) {
        console.log("REPORT 2", "| A:", a, "| B:", b, "| C:", c, "| SUM:", a + b + c, "| RESULT:", a * b * c);
        return;
      }
    }
  }
};

report1();
report2();
