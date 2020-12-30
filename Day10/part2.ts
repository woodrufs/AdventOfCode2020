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

  const solution = count(sortedLines, 0, {});

  return solution;
};

const getJoltageTuple = (sortedAdapters: Array<number>, index) => {
  return [sortedAdapters[index], index];
};

const count = (sortedAdapters: Array<number>, index: number, cache: {}) => {
  let solution = 0;
  if (cache[index]) {
    solution = cache[index];
  } else if (sortedAdapters.length - 1 === index) {
    solution = 1;
    cache[index] = solution;
  } else {
    const currentJoltage = sortedAdapters[index];
    // either 1, 2 or 3 next adapters can work?
    const [nextJoltage, nextIndex] = getJoltageTuple(sortedAdapters, index + 1);
    const [secondJoltage, secondIndex] = getJoltageTuple(
      sortedAdapters,
      index + 2
    );
    const [thirdJoltage, thirdIndex] = getJoltageTuple(
      sortedAdapters,
      index + 3
    );
    if (nextJoltage && nextJoltage - currentJoltage <= 3) {
      solution += count(sortedAdapters, nextIndex, cache);
    }
    if (secondJoltage && secondJoltage - currentJoltage <= 3) {
      solution += count(sortedAdapters, secondIndex, cache);
    }
    if (thirdJoltage && thirdJoltage - currentJoltage <= 3) {
      solution += count(sortedAdapters, thirdIndex, cache);
    }
  }
  cache[index] = solution;
  return solution;
};

console.log(exec("input.txt"));
