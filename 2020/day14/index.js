const fs = require("fs");
const lines = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n");

const testLines = [
  "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
  "mem[8] = 11",
  "mem[7] = 101",
  "mem[8] = 0",
];

const partOne = (input) => {
  let mask = "";
  let mem = {};

  for (const i of input) {
    if (i.startsWith("mask")) {
      mask = i.split(" = ")[1];
      continue;
    }

    const [pos, val] = i.replace("mem[", "")
      .replace("]", "")
      .split(" = ")
      .map(Number);

    const bin = val.toString(2).padStart(36, "0").split("");

    const memVal = mask.split("").reduce((arr, b, i) => {
      if (b === "X") {
        arr.push(bin[i]);
      }
      else {
        arr.push(b);
      }
      return arr;
    }, []);

    const memValBin = parseInt(memVal.join(""), 2);

    if (memValBin !== 0) mem[pos] = memValBin;
  }
  const result = Object.values(mem).reduce((sum, i) => sum + i, 0);
  console.log(result);
}

console.log("PART ONE")
partOne(testLines); // expected: 165
partOne(lines); // answer: 10452688630537


const testLines2 = [
  "mask = 000000000000000000000000000000X1001X",
  "mem[42] = 100",
  "mask = 00000000000000000000000000000000X0XX",
  "mem[26] = 1",
]
const partTwo = (input) => {
  let mask = "";
  let mem = {};

  for (const i of input) {
    if (i.startsWith("mask")) {
      mask = i.split(" = ")[1];
      continue;
    }

    const [address, val] = i.replace("mem[", "")
      .replace("]", "")
      .split(" = ")
      .map(Number);

    const addressBin = address.toString(2).padStart(36, "0").split("");

    const addresses = mask.split("").reduce((arr, b, i) => {
      if(arr.length === 0) arr.push([]);
      if(b === "0") {
        arr.forEach(x => x.push(addressBin[i]));
      }
      else if (b === "1") {
        arr.forEach(x => x.push("1"));
      }
      else {
        arr.forEach(x => {
          arr.push([...x, "0"]);
          x.push("1");
        })
      }
      return arr;
    }, []).map(x => parseInt(x.join(""), 2));

    addresses.forEach(x => mem[x] = val);
  }

  const result = Object.values(mem).reduce((sum, i) => sum + i, 0);
  console.log(result);
}

console.log();
console.log("PART TWO")
partTwo(testLines2); // expected: 208
partTwo(lines); // answer: 2881082759597
