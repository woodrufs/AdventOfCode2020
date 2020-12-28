import fs from "fs";
import _ from "lodash";
import { exit } from "process";

const runRegEx = (line: string): [string, string[1], number] => {
  let regMatch = line.match(/(nop|acc|jmp) ([+-])([\d]+)/);
  const instruction = regMatch[1];
  const negator = regMatch[2] === "+" ? 1 : -1;
  const jumpOrAccumlateChange = parseInt(regMatch[3]) * negator;
  return [instruction, regMatch[2], jumpOrAccumlateChange];
};

const exec = (filename: string) => {
  let lastReplacedIndex = 0;
  /**
   * Finds the next index containing a jmp or nop
   * @param lines - The original array of instructions
   * @param lastReplacedIndex - The last replaced index.
   */
  const findNextReplaceIndex = (
    lines: Array<string>,
    lastReplacedIndex: number
  ): number => {
    for (let index = lastReplacedIndex + 1; index < lines.length; index++) {
      const line = lines[index];
      const [instruction] = runRegEx(line);
      if (instruction === "jmp" || instruction === "nop") {
        return index;
      }
    }
  };
  /**
   * Replaces the next nop or jmp instruction while returning a modified copy of the original
   * set of instructions.
   */
  const replaceInstruction = (lines: Array<string>, index) => {
    const copy = _.cloneDeep(lines);
    const line = lines[index];
    const [instruction, symbol, jumpOrAccumlateChange] = runRegEx(line);
    let newInstruction;
    if (instruction === "nop") {
      newInstruction = "jmp";
    } else if (instruction === "jmp") {
      newInstruction = "nop";
    }

    if (newInstruction) {
      copy[index] = `${newInstruction} ${symbol}${Math.abs(
        jumpOrAccumlateChange
      ).toString()}`;
    }

    return copy;
  };
  const lines: Array<string> = fs.readFileSync(filename).toString().split("\n");
  while (true) {
    // get last replaced index
    lastReplacedIndex = findNextReplaceIndex(lines, lastReplacedIndex);

    //replace line
    const copy = replaceInstruction(lines, lastReplacedIndex);

    // execute
    execModified(copy);
  }
};

const execModified = (lines: Array<string>): number => {
  let accumulator = 0;
  const executedCommands = new Array<[string, number]>(lines.length);
  let currentLine = 0;
  let lastInstruction = false;
  while (!executedCommands[currentLine]) {
    if (lastInstruction) {
      console.log(`Solution: ${accumulator}`);
      exit(0);
    }
    lastInstruction = currentLine === lines.length - 1;
    let line = lines[currentLine];
    if (!line) {
      continue;
    }
    let regMatch = line.match(/(nop|acc|jmp) ([+-])([\d]+)/);
    if (!regMatch) {
      continue;
    }

    const [instruction, , jumpOrAccumlateChange] = runRegEx(line);
    executedCommands[currentLine] = [instruction, jumpOrAccumlateChange];
    switch (instruction) {
      case "nop":
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
