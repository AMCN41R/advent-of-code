const log = console.log;

const input = "20,9,11,0,1,2";
const testInput = "0,3,6";

const partOne = (items) => {
  // const numArr = numbers.split(",");
  // const o = numArr.reduce((prev, n, i) => {
  //   prev[n] = { c: 1, i };
  //   return prev;
  // }, {});

  // let latest = numbers.split(",").slice(-1)[0];
  // for (let i = numArr.length + 1; i <= 2020; i++) {
  //   if (latest.c === 1) {
  //     const prev = o["0"];
  //     if (prev) {
  //       o["0"] = { c: prev.c + 1, i };
  //     }
  //     else {
  //       o["0"] = { c: 1, i };
  //     }
  //   }



  //   if (Object.keys(o).includes(latest)) {
  //     latest = i - o[latest];
  //   }
  //   else {
  //     latest = "0";
  //   }
  //   o[latest] = i;
  // }
  // console.log(latest);


  let numbers = items.split(",").map(Number).reverse();
  log(numbers)

  let i = 4;
  while (i <= 10) {
    const n = numbers[0];
    const lastSpoken = numbers.indexOf(n);
    const prevSpoken = numbers.indexOf(n, lastSpoken);
    const spokenOnce = lastSpoken === prevSpoken;

    log(i, n, lastSpoken, prevSpoken)

    numbers = spokenOnce 
      ? [0, ...numbers]
      : [(lastSpoken - prevSpoken), ...numbers];

    i++;
  }

  console.log(numbers[0]);
}

console.log("PART ONE")
partOne(testInput); // expected: 436
// partOne(input); // answer:
