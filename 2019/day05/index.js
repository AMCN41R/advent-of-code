const fs = require("fs");
const init = fs.readFileSync("input.txt", "utf-8").split(",").map(Number);

const operations = {
  "01": {
    params: 3,
    execute: (mem, i, modes, opts) => {
      const v1 = modes[2] === "0" ? mem[mem[i + 1]] : mem[i + 1];
      const v2 = modes[1] === "0" ? mem[mem[i + 2]] : mem[i + 2];
      const pos = mem[i + 3];
      mem[pos] = v1 + v2;
    }
  },
  "02": {
    params: 3,
    execute: (mem, i, modes, opts) => {
      const v1 = modes[2] === "0" ? mem[mem[i + 1]] : mem[i + 1];
      const v2 = modes[1] === "0" ? mem[mem[i + 2]] : mem[i + 2];
      const pos = mem[i + 3];
      mem[pos] = v1 * v2;
    }
  },
  "03": {
    params: 1,
    execute: (mem, i, modes, opts) => {
      mem[mem[i + 1]] = opts.input;
    }
  },
  "04": {
    params: 1,
    execute: (mem, i, modes, opts) => {
      const result = modes[2] === "0" ? mem[mem[i + 1]] : mem[i + 1]
      return { code: result };
    }
  },
  "05": {
    params: 2,
    execute: (mem, i, modes, opts) => {
      const p1 = modes[2] === "0" ? mem[mem[i + 1]] : mem[i + 1];
      if (p1 !== 0) {
        const p2 = modes[1] === "0" ? mem[mem[i + 2]] : mem[i + 2];
        return { p: p2 };
      }
    }
  },
  "06": {
    params: 2,
    execute: (mem, i, modes, opts) => {
      const p1 = modes[2] === "0" ? mem[mem[i + 1]] : mem[i + 1];
      if (p1 === 0) {
        const p2 = modes[1] === "0" ? mem[mem[i + 2]] : mem[i + 2];
        return { p: p2 };
      }
    }
  },
  "07": {
    params: 3,
    execute: (mem, i, modes, opts) => {
      const p1 = modes[2] === "0" ? mem[mem[i + 1]] : mem[i + 1];
      const p2 = modes[1] === "0" ? mem[mem[i + 2]] : mem[i + 2];
      if (p1 < p2) {
        mem[mem[i + 3]] = 1;
      } else {
        mem[mem[i + 3]] = 0;
      }
    }
  },
  "08": {
    params: 3,
    execute: (mem, i, modes, opts) => {
      const p1 = modes[2] === "0" ? mem[mem[i + 1]] : mem[i + 1];
      const p2 = modes[1] === "0" ? mem[mem[i + 2]] : mem[i + 2];
      if (p1 === p2) {
        mem[mem[i + 3]] = 1;
      } else {
        mem[mem[i + 3]] = 0;
      }
    }
  }
};

const runProgram = (memory, input) => {
  let pointer = 0;

  const results = [];

  while (true) {
    const instruction = memory[pointer].toString().padStart(5, "0");
    const opCode = instruction.substring(3);
    const modes = instruction.substring(0, 3);

    if (opCode === "99") {
      break;
    }

    const op = operations[opCode];

    if (!op) {
      console.error(pointer, instruction, opCode);
      pointer++;
      continue;
    }

    const result = op.execute(memory, pointer, modes, {
      input
    });

    if (result && result.code) results.push(result.code);
    if (result && result.p) {
      pointer = result.p;
    } else {
      pointer += (op.params + 1);
    }
  }

  return results;
}

// part one
console.log("Part One");
const codes1 = runProgram([...init], 1);
console.log(codes1); // answer: 7566643

// part two
console.log("\nPart Two");
const codes2 = runProgram([...init], 5);
console.log(codes2); // answer: 9265694
