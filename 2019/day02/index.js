const fs = require("fs");
const content = fs.readFileSync("input.txt", "utf-8");
const codes = content.split(",").map(Number);

const runProgram = (memory, noun, verb) => {
  memory[1] = noun;
  memory[2] = verb;

  for (let i = 0; i < memory.length; i += 4) {
    const op = memory[i];

    if (op === 99) {
      break;
    }

    if (op !== 1 && op !== 2) {
      console.error("Invalid Operation");
      break;
    }

    const i1 = memory[i + 1];
    const i2 = memory[i + 2];
    const pos = memory[i + 3];

    const result = op === 1
      ? memory[i1] + memory[i2]
      : memory[i1] * memory[i2];

    memory[pos] = result;
  }

  return [...memory];
}

// part one
var result1 = runProgram([...codes], 12, 2);
console.log("Part One:", result1[0]);

// part 2
for (let i = 0; i < 99; i++) {
  for (let j = 0; j < 99; j++) {
    var result2 = runProgram([...codes], i, j);
    if (result2[0] === 19690720){
      console.log("Part Two:", "Noun", i, "Verb", j, "Result", (100 * i) + j);
      break;
    }
  }
}
