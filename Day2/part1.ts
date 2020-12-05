import fs from "fs";

interface PasswordLine {
  min: number;
  max: number;
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
        min: parseInt(parsedLine[1]),
        max: parseInt(parsedLine[2]),
        searchChar: parsedLine[3],
        password: parsedLine[4],
      };
    }
  );

let validPasswords: number = 0;
lines.forEach((line) => {
  let match: number = 0;
  for (let i = 0; i < line.password.length; i++) {
    if (line.searchChar === line.password[i]) {
      match++;
    }
  }
  if (line.min <= match && match <= line.max) {
    validPasswords++;
  }
});
console.log(`Valid Passwords: ${validPasswords}`);
