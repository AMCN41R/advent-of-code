import * as fs from "fs";

export const getLines = (filepath: string) => {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\r\n");
  console.log("Total Input Records:", lines.length);
  console.log("");

  return lines;
}

// logPart = (part, lines) => {
  
// }

// module.exports = {
//   getLines
// }