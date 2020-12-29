import fs from "fs";
import _, { first } from "lodash";
import { exit } from "process";

const sumExists = (
  preamble: Array<number>,
  desiredSum: number,
  numbersToSum: number
): boolean => {
  const sortedPreamble = _.filter(preamble, (n) => n < desiredSum).sort(
    (first, second) => {
      if (first < second) {
        return -1;
      } else if (second > first) {
        return 1;
      }
      return 0;
    }
  );
  for (let i = 0; i < sortedPreamble.length; i++) {
    const firstInt = sortedPreamble[i];
    for (let j = i + 1; j < sortedPreamble.length; j++) {
      const secondInt = sortedPreamble[j];
      if (firstInt + secondInt === desiredSum) {
        console.log(`${firstInt} and ${secondInt} sum to ${desiredSum}`);
        return true;
      }
    }
  }
  console.log(`No sum found for ${desiredSum}`);
  return false;
};
const exec = (fileName: string, desiredSum: number): number => {
  const lines: Array<number> = fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((l) => parseInt(l));

  for (let i = 0; i < lines.length; i++) {
    const contigousSet = new Array<number>();
    contigousSet.push(lines[i]);
    for (let j = i + 1; j < lines.length; j++) {
      contigousSet.push(lines[j]);
      const sum = contigousSet.reduce((prev, current) => (prev += current));
      if (sum === desiredSum) {
        const sortedSet = _.sortBy(contigousSet);
        const solution = sortedSet[0] + sortedSet[sortedSet.length - 1];
        console.log(`Solution: ${solution}`);
        exit(0);
      } else if (sum > desiredSum) {
        break;
      }
    }
  }

  console.error("This should never be hit!");
  return exit(1);
};

console.log(exec("input.txt", 1124361034));
