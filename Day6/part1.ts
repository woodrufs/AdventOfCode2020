import fs from "fs";

const lines = fs.readFileSync("./input.txt").toString().split("\n");
let group = {};
let groupCounts = [];

lines.forEach((line) => {
  if (line.length === 0) {
    // reset group
    groupCounts.push(Object.keys(group).length);
    group = {};
  } else {
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      group[line[charIndex]] = 1;
    }
  }
});

// file doesn't end with an empty line, so we need to manually add last group
groupCounts.push(Object.keys(group).length);

const sum = groupCounts.reduce((gc1, gc2) => {
  return gc1 + gc2;
});
console.log(`Solution: ${sum}`);
