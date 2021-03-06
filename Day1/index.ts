import fs from "fs";
import readLine from "readline-promise";
import { PassThrough } from "stream";
const userInputInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface PasswordLine {
  min: number;
  max: number;
  searchChar: string;
  password: string;
}
const lines = fs
  .readFileSync("Passwords.txt")
  .toString()
  .split("\n")
  .map(
    (line): PasswordLine => {
      const parsedLine = /^(\d)+-(\d)+ ([a-z]): ([a-z]*)$/.exec(line);
      return {
        min: parseInt(parsedLine.groups[0]),
        max: parseInt(parsedLine.groups[2]),
        searchChar: parsedLine.groups[3],
        password: parsedLine.groups[4],
      };
    }
  );
let validPasswords: number = 0;
lines.forEach((line) => {
  let match: number = 0;
  for (let i = 0; i < line.password.length; i++) {
    if (line.searchChar === line[i]) {
      match++;
    }
  }
  if (line.min <= match && match <= line.max) {
    validPasswords++;
  }
});
console.log(`Valid Passwords: ${validPasswords}`);
