import fs from "fs";

// split a line with multiple passport fields into one field per line
const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .replace(" ", "\n")
  .split("\n");

let validPassports = 0;
let cidPresent = false;
let passportFields = 0;

for (let index = 0; index < lines.length; index++) {
  console.log(`Line index: ${index}`);
  const line = lines[index];
  console.log(`line: ${line}`);
  // end of current password
  if (line.length === 0) {
    console.log("End of passport detected.");
    console.log(`Total passport fields detected: ${passportFields}`);
    if (
      passportFields === 8 ||
      (passportFields === 7 && cidPresent === false)
    ) {
      validPassports++;
    }

    // reset variables for next passport
    cidPresent = false;
    passportFields = 0;
  } else {
    const count = line.split(":").length - 1;
    console.log(`Fields found for current line: ${count}`);
    passportFields += count;
    console.log(
      `Current number of fields found for passport: ${passportFields}`
    );
    const cidMatch = /cid/.exec(line);
    console.log(cidMatch);

    if (cidMatch) {
      console.log("Found CID.");
      cidPresent = true;
    }
  }
}
console.log(`Total valid passports: ${validPassports}`);
