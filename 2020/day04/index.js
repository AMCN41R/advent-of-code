const fs = require("fs");
const lines = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split(/\n/);

const passports = [];
let pointer = 0
for (let i = 0; i < lines.length; i++) {
  const e = lines[i];
  if (e === "") {
    pointer++;
    continue;
  }
  const val = passports[pointer];
  passports[pointer] = val ? `${val} ${e}` : e;
}

const hasRequiredFields = (passport) =>
  passport.includes("byr:") &&
  passport.includes("iyr:") &&
  passport.includes("eyr:") &&
  passport.includes("hgt:") &&
  passport.includes("hcl:") &&
  passport.includes("ecl:") &&
  passport.includes("pid:");

const hasValidFields = (passport) => {
  for (const field of passport.split(" ")) {
    const [k, v] = field.split(":");
    switch (k) {
      case "byr":
        if (!Number(v) || Number(v) < 1920 || Number(v) > 2002) return false;
        break;

      case "iyr":
        if (!Number(v) || Number(v) < 2010 || Number(v) > 2020) return false;
        break;

      case "eyr":
        if (!Number(v) || Number(v) < 2020 || Number(v) > 2030) return false;
        break;

      case "hgt":
        const m = v.slice(-2);
        if (m !== "in" && m !== "cm") return false;
        const n = v.slice(0, -2);
        if (!Number(n)) return false;
        if (m === "cm" && (Number(n) < 150 || Number(n) > 193)) return false;
        if (m === "in" && (Number(n) < 59 || Number(n) > 76)) return false;
        break;

      case "hcl":
        if(!(v.match(/^\#([0-9a-f]{6})$/))) return false
        break;

      case "ecl":
        if(!(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]).includes(v)) return false;
        break;

      case "pid":
        if(!(v.match(/^\d{9}$/))) return false
        break;

      default:
        break;
    }
  }

  return true;
};

// part one
console.log("Part One");
var valid1 = passports.filter(hasRequiredFields);
console.log("Valid:", valid1.length); // answer: 247

// part two
console.log("\nPart Two");
const valid2 = valid1.filter(hasValidFields);
console.log("Valid:", valid2.length); // answer: 145
