const fs = require("fs");

const args = process.argv.slice(2);

if (!args || !args[0] || !Number(args[0])){
  console.log("Valid day argument must be provided.");
  return;
}

const day = Number(args[0]);
const dayStr = day < 10 ? `0${day}` : `${day}`;

const dir = `day${dayStr}`;

if (fs.existsSync(dir)) {
  console.log(`Directory '${dir}' already exists.`);
  return;
}

const content =
  'import * as utils from "../utils";\r\n' +
  '\r\n' +
  'const input = utils.getLines("input.txt");\r\n' +
  '\r\n' +
  'const testInput = [];' +
  `\r\n\r\n`;

fs.mkdirSync(dir);
fs.appendFileSync(`./${dir}/index.ts`, content);
fs.appendFileSync(`./${dir}/input.txt`, "");
fs.appendFileSync(`./${dir}/README`, "");
