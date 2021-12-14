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

export const mostFrequent = <T>(arr: T[]): { item: T | null, count: number } => {
  const hash = arr.reduce((r, n) => r.set(n, (r.get(n) || 0) + 1), new Map<T, number>());
  const result = [...hash].reduce((r, v) => v[1] > r[1] ? v : r)

  return { item: result[0], count: result[1] };
}

export const leastFrequent = <T>(arr: T[]): { item: T | null, count: number } => {
  const hash = arr.reduce((r, n) => r.set(n, (r.get(n) || 0) + 1), new Map<T, number>());
  const result = [...hash].reduce((r, v) => v[1] < r[1] ? v : r);

  return { item: result[0], count: result[1] };
}
