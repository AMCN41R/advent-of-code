import * as fs from "fs";
import "colors";

export const getLines = (filepath: string): string[] => {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\r\n");
  console.log("Total Input Records:", lines.length);
  console.log("");

  return lines;
}

export const logPartOne = (): void => logPart("ONE");
export const logPartTwo = (): void => logPart("TWO");

const logPart = (part: 'ONE' | 'TWO'): void => {
  console.log(`** PART ${part} **`);
  console.log("--------------")
}

export const chunk = <T>(arr: T[], chunkSize: number): T[][] => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export const has = <T>(arr: T[], item: T): boolean => arr.indexOf(item) !== -1;
