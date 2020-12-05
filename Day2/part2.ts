import fs from "fs";

interface PasswordLine {
  positionOne: number;
  positionTwo: number;
  searchChar: string;
  password: string;
}

const lines = fs
  .readFileSync("./Passwords.txt")
  .toString()
  .split("\n")
  .map(
    (line): PasswordLine => {
      const parsedLine = /^(\d+)-(\d+) ([a-z]): ([a-z]*)$/.exec(line);
      return {
        positionOne: parseInt(parsedLine[1]) - 1,
        positionTwo: parseInt(parsedLine[2]) - 1,
        searchChar: parsedLine[3],
        password: parsedLine[4],
      };
    }
  );

let validPasswords: number = 0;
lines.forEach((line) => {
  let match: number = 0;
  if (line.password[line.positionOne] === line.searchChar) {
    match++;
  }
  if (line.password[line.positionTwo] === line.searchChar) {
    match++;
  }
  if (match === 1) {
    validPasswords++;
  }
});
console.log(`Valid Passwords: ${validPasswords}`);
