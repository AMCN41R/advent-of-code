import * as fs from "fs";

export const getLines = (filepath: string): string[] => {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\n");
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

export const getDuplicates = (items: string[]): string[] => {
  const uniqueElements = new Set(items);
  const copySet = [...items];
  const filteredElements = items.filter(item => {
    if (uniqueElements.has(item)) {
      uniqueElements.delete(item);
    } else {
      return item;
    }
  });

  return filteredElements;
}

export const mode = (arr: number[]): { value: number, count: number } => {
  const mode: { [key: number]: number } = {};
  let max = 0, count = 0;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }

    if (count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }

  return { value: max, count };
};

export const alpha = 'abcdefghijklmnopqrstuvwxyz';
export const alphaCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const sum = (arr: number[]): number => arr.reduce((total, next) => total + next, 0);
