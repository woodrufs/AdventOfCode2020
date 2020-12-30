import fs from "fs";
import _ from "lodash";

const exec = (fileName: string) => {
  const lines: Array<number> = fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((l) => parseInt(l));
  let sortedLines = lines.sort((a, b) => a - b);
  sortedLines = [0, ...sortedLines, sortedLines[sortedLines.length - 1] + 3];
  const one = [];
  const two = [];
  const three = [];
  for (let i = 0; i < sortedLines.length - 1; i++) {
    const leading = sortedLines[i];
    const trailing = sortedLines[i + 1];
    const diff = trailing - leading;
    switch (diff) {
      case 1:
        one.push([leading, trailing]);
        break;
      case 2:
        two.push([leading, trailing]);
        break;
      case 3:
        three.push([leading, trailing]);
        break;
      default:
        break;
    }
  }

  return one.length * three.length;
};

console.log(exec("input.txt"));
