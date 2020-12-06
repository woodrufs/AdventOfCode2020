import fs from "fs";

const lines: string[] = fs.readFileSync("./slope.txt").toString().split("\n");

interface slope {
  x: number;
  y: number;
}
const slopes: slope[] = [];
slopes.push({ x: 1, y: 1 });
slopes.push({ x: 3, y: 1 });
slopes.push({ x: 5, y: 1 });
slopes.push({ x: 7, y: 1 });
slopes.push({ x: 1, y: 2 });

const makeRuns = (slopes: slope[]): number => {
  let totalTrees = 1;
  slopes.forEach((slope) => {
    let trees = 0;
    const slopeLength = lines.length;
    const slopeWidth = lines[0].length;
    const xMovement = slope.x;
    let currentXCoord = 0;
    for (let i = 0; i < slopeLength; i = i + slope.y) {
      trees = lines[i][currentXCoord] === "#" ? trees + 1 : trees;
      let nextXCoord = currentXCoord + xMovement;
      if (nextXCoord >= slopeWidth) {
        nextXCoord = nextXCoord % slopeWidth;
      }
      currentXCoord = nextXCoord;
    }
    console.table(slope);
    console.log(`trees ${trees}`);
    totalTrees *= trees;
  });
  return totalTrees;
};
const product = makeRuns(slopes);
console.log(`solution: ${product}`);
