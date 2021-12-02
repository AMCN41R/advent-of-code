const fs = require("fs");

const getLines = (filepath) => {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\r\n");
  console.log("Total Records:", lines.length);

  return lines;
}

module.exports = {
  getLines
}