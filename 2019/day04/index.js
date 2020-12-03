const min = 138307;
const max = 654504;

const hasRepeat = (s) => {
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && s[i] === s[i + 1]) {
      return true;
    }
  }
  return false;
}

const increases = (s) => {
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && Number(s[i]) > Number(s[i + 1])) {
      return false;
    }
  }
  return true;
}

const hasDouble = (s) => {
  for (let i = 0; i <= 9; i++) {
    let idx = -1;
    let err = false;
    for (let j = 0; j < s.length; j++) {
      const e = s.indexOf(`${i}${i}`, j);
      if (e === -1) break;
      if (idx === -1) {
        idx = e
      } else {
        if (idx !== e){
          err = true;
          break;
        }
      }
    }
    if (idx !== -1 && !err) return true;
  }
  return false;
}

// part one
console.log("Part One");
const result1 = [];
for (let i = min; i <= max; i++) {
  const s = i.toString();
  if (hasRepeat(s) && increases(s)) {
    result1.push(i);
  }
}
console.log("Possibilities:", result1.length); // answer: 1855

// part two
console.log("\nPart Two");
const result2 = [];
for (let i = min; i <= max; i++) {
  const s = i.toString();
  if (hasDouble(s) && increases(s)) {
    result2.push(i);
  }
}
console.log("Possibilities:", result2.length); // answer: 1253
