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

export const alpha = 'abcdefghijklmnopqrstuvwxyz';
export const alphaCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export type logger = (message?: any, ...optionalParams: any[]) => void;
export const noLog: logger = () => { };

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

export const has = <T>(arr: T[], item: T): boolean => arr.indexOf(item) !== -1;

export const add = (a: number, b: number) => a + b;
export const sum = (arr: number[]): number => arr.reduce(add, 0);

export const multiply = (a: number, b: number) => a * b;
export const product = (arr: number[]): number => arr.reduce(multiply, 1);

export const mapXY = (item: string, separator: string = ','): [number, number] => {
  const parts = item.split(separator);
  return [Number(parts[0]), Number(parts[1])];
}
