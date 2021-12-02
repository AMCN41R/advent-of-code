import * as fs from "fs";
import "colors";

export const getLines = (filepath: string): string[] => {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\r\n");
  console.log("Total Input Records:", lines.length);
  console.log("");

  return lines;
}

export const logPart = (part: 'ONE' | 'TWO'): void => {
  console.log(`** PART ${part} **`);
  console.log("--------------")
}

export const log = <T>(detail: { msg: 'test' | 'result', expected?: T, result: T }[]) => {
  const table = detail.map(x => ({
    item: x.msg,
    expected: x.expected || "-",
    result: x.result,
    ok: x.expected === x.result ? "OK" : "FAIL"
  }));
  console.table(table);
  console.log("");
}
