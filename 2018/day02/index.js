const utils = require("../utils");

const input = utils.getLines("input.txt");
// const input = [
//   'abcdef',
//   'bababc',
//   'abbcde',
//   'abcccd',
//   'aabcdd',
//   'abcdee',
//   'ababab'
// ] // expected 4 x 3 = 12

const grp = (str) => [...str].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {});
const grps = input.map(x => grp(x));

const twos = grps.filter(x => new Set(Object.values(x)).has(2)).length;
const threes = grps.filter(x => new Set(Object.values(x)).has(3)).length;

console.log("Two:", twos);
console.log("Three:", threes);
console.log("P1 Result:", twos * threes); // answer: 246 x 23 = 5658
console.log("");

// const ti = [
//   'abcde',
//   'fghij',
//   'klmno',
//   'pqrst',
//   'fguij',
//   'axcye',
//   'wvxyz',
// ] // expected: fgij

let result2 = null;
let i = 0;
const max = input[0].length - 1;
const set = new Set([]);

while (result2 === null || i == max) {
  const ns = input.map(x => i === 0 ? x.slice(1) : x.slice(0, i) + x.slice(i+1));
  for (const s of ns) {
    if (set.has(s)) {
      result2 = s;
      break;
    }
    set.add(s);
  }
  set.clear();
  i++;
}

console.log("P2 Result:", result2); // answer: nmgyjkpruszlbaqwficavxneo