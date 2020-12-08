const fs = require("fs");
const instructions = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n");

const getInstructions = () => [...instructions].map((x, idx) => {
  const [i, a] = x.split(" ");
  return {
    instruction: i,
    arg: Number(a),
    idx: idx,
    executed: false
  }
});

const execute = (input) => {
  let pointer = 0;
  let accumulator = 0;
  let looped = false;

  while (true) {
    if (pointer >= input.length) {
      break
    };

    const item = input[pointer];

    if (item.executed) {
      looped = true;
      break;
    }
    else { item.executed = true; }

    switch (item.instruction) {
      case "nop":
        pointer++;
        break;

      case "acc":
        accumulator += item.arg;
        pointer++;
        break;

      case "jmp":
        pointer += item.arg;
        break;
    }
  }

  return { accumulator, complete: !looped };
}

const replaceAndExecute = (replace, withThis) => {
  const items = getInstructions().filter(x => x.instruction === replace);
  for (const item of items) {
    const input = getInstructions();
    input[item.idx] = { ...item, instruction: withThis };
    const result = execute(input);
    if (result.complete) {
      return result;
    }
  }
}

const fix = () => {
  let final;
  final = replaceAndExecute("jmp", "nop");
  if(!final) final = replaceAndExecute("nop", "jmp");

  return final;
}

// part one
console.log("Part One");
console.log(execute(getInstructions())); // answer: 1087

// part two
console.log("\nPart Two");
console.log(fix()) // answer: 780
