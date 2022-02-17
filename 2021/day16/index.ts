import * as utils from "../utils";
const { logPartOne, logPartTwo } = utils;
const log = console.log;

export const input = utils.getLines(__dirname + "\\input.txt");

export const testInput: string[] = [
  "8A004A801A8002F478"
];

const hexMap: { [key: string]: string } = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  "A": "1010",
  "B": "1011",
  "C": "1100",
  "D": "1101",
  "E": "1110",
  "F": "1111",
};
// 100010100000000001001010100000000001101010000000000000101111010001111000

type Packet = {
  version: number,
  typeId: number,
  subPackets: Packet[],
  literalPackets: string[]
};

const getPacket = (bin: string, maxLiteralPackets: number = 0): Packet => {
  // if (bin.length < 3) return { version: 0, typeId: 0, subPackets: [], literalPackets: [] };

  let i = 0;

  const version = parseInt(bin.substring(i, i + 3), 2);
  i = i + 3;

  const typeId = parseInt(bin.substring(i, i + 3), 2);
  i = i + 3;

  const isLiteral = typeId === 4;

  if (isLiteral) {
    const lp = [];
    let isEnd = false;
    while (!isEnd || (maxLiteralPackets > 0 && lp.length === maxLiteralPackets)) {
      isEnd = bin[i] === "0";
      lp.push(bin.substring(i, i + 4));
      i = i + 5;
    }

    return { version, typeId, subPackets: [], literalPackets: lp };
  }

  // const mode = bin[i];
  // i = i + 1;

  // if (mode === "0") {
  //   const l = parseInt(bin.substring(i, i + 14), 2);
  //   i = i + 15;
  //   return { version, typeId, subPackets: [getPacket(bin.substring(i))], literalPackets: [] };
  // }
  // else {
  //   const l = parseInt(bin.substring(i, i + 10), 2);
  //   i = i + 11;
  //   return { version, typeId, subPackets: [getPacket(bin.substring(i, l))], literalPackets: [] };
  // }

  return { version: 0, typeId: 0, subPackets: [], literalPackets: [] };
}


logPartOne();

export const partOne = (items: string[]): number => {
  const hex = items[0];
  const bin = hex.split("").map(x => hexMap[x]).join("");
  log(hex)
  log(bin)

  log(getPacket(bin))

  return 0;
}

log("P1 Result (test):", partOne(testInput)); // expected: 16
// log("P1 Result:", partOne(input)); // answer: 
log();


logPartTwo();

export const partTwo = (items: string[]): number => {
  return 0;
}

log("P2 Result (test):", partTwo(testInput)); // expected: 
// log("P2 Result:", partTwo(input)); // answer: 
log();
