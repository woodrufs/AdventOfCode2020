import fs from "fs";

const lines: string[] = fs.readFileSync("./slope.txt").toString().split("\n");

const slopeLength = lines.length;
const slopeWidth = lines[0].length;
let trees = 0;
const xMovement = 3;
let currentXCoord = 0;
for (let i = 0; i < slopeLength; i++) {
  trees = lines[i][currentXCoord] === "#" ? trees + 1 : trees;
  let nextXCoord = currentXCoord + xMovement;
  if (nextXCoord >= slopeWidth) {
    nextXCoord = nextXCoord % slopeWidth;
  }
  currentXCoord = nextXCoord;
}
console.log(trees);
