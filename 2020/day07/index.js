const fs = require("fs");
const rules = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").split("\n");

const children = (str) => str.split(",")
  .map(x => x.trim().split(" ").slice(0, -1))
  .map(x => [x[0], x.slice(1).join(" ")]);

const bags = rules
  .map(x => x.split(" bags contain "))
  .map(x => ({ name: x[0], children: x[1].startsWith("no other") ? [] : children(x[1]) }));

const getBag = (bag) => bags.find(x => x.name === bag);

// part one
console.log("Part One");
const search1 = (bag) => {
  let parents = bags.filter(x => x.children.map(c => c[1]).includes(bag)).map(x => x.name);
  parents.forEach(p => parents = [...parents, ...search1(p)]);
  return parents;
}
const s1 = new Set(search1("shiny gold"));
console.log("shiny gold:", s1.size); // answer: 257

// part two
console.log("\nPart Two");
const search2 = (bag) => {
  let counter = 1;
  const bagInfo = getBag(bag);
  bagInfo.children.forEach(bi => {
    const [amount, nextBag] = bi;
    for (let i = 0; i < amount; i++) counter += search2(nextBag);
  })
  return counter;
};
console.log("shiny gold contains:", search2("shiny gold") - 1); // answer 1038
