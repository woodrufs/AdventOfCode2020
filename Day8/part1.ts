import fs from "fs";
import _ from "lodash";

const exec = (fileName: string): number => {
  let accumulator = 0;
  const lines: Array<string> = fs.readFileSync(fileName).toString().split("\n");
  const executedCommands = new Array<[string, number]>(lines.length);
  let currentLine = 0;
  const linesExecuted = new Array<number>();
  while (linesExecuted.some((n) => n === currentLine) === false) {
    let line = lines[currentLine];
    if (!line) {
      continue;
    }
    let regMatch = line.match(/(nop|acc|jmp) ([+-])([\d]+)/);
    if (!regMatch || !line) {
      continue;
    }
    const instruction = regMatch[1];
    const negator = regMatch[2] === "+" ? 1 : -1;
    const jumpOrAccumlateChange = parseInt(regMatch[3]) * negator;
    executedCommands[currentLine] = [instruction, jumpOrAccumlateChange];
    linesExecuted.push(currentLine);
    switch (instruction) {
      case "nop":
        executedCommands[currentLine] = [instruction, jumpOrAccumlateChange];
        currentLine++;
        break;
      case "acc":
        accumulator += jumpOrAccumlateChange;
        currentLine++;
        break;
      case "jmp":
        currentLine += jumpOrAccumlateChange;
        break;
      default:
        break;
    }
  }

  return accumulator;
};

console.log(exec("input.txt"));
