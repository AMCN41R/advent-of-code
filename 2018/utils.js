const fs = require("fs");

const getLines = (filepath) => {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\r\n");
  console.log("Total Input Records:", lines.length);
  console.log("");

  return lines;
}

module.exports = {
  getLines
}
