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
const exec = (fileName: string): number => {
  const lines: Array<number> = fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((l) => parseInt(l));
  const preamble = new Array<number>(25);
  lines.forEach((line, index) => {
    const desiredSum = line;
    if (index < 25) {
      preamble.push(line);
      return;
    }

    const foundSum = sumExists(preamble, desiredSum, 2);
    if (!foundSum) {
      exit(0);
    }
    preamble.push(desiredSum);
    preamble.shift();
  });

  console.error("This should never be hit!");
  return exit(1);
};

console.log(exec("input.txt"));
