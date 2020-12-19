import fs from "fs";
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.
const validateBirthYear = (year) => {
  return validateInRange([1920, 2002], year);
};

const validateIssueYear = (year) => {
  return validateInRange([2010, 2020], year);
};

const validateExpirationYear = (year) => {
  return validateInRange([2020, 2030], year);
};

const validateHairColor = (hairColor) => {
  const hclRegexMatch = /#([0-9a-f]{6})/.exec(hairColor);
  if (hclRegexMatch === null) {
    return false;
  }
  return true;
};

const validateHeight = (height: string) => {
  // const hgtRegexMatch = /(\d+)(cm|in)/.exec(height);
  const hgtRegexMatch = height.match(/(\d+)(cm|in)/);
  if (hgtRegexMatch === null) {
    return false;
  }
  let hgtRange: [number, number];
  switch (hgtRegexMatch[2]) {
    case "in":
      hgtRange = [56, 76];
      break;
    case "cm":
      hgtRange = [150, 193];
      break;
    default:
      return false;
  }
  const hgt = Number.parseInt(hgtRegexMatch[1]);
  const [minHeight, maxHeight] = hgtRange;
  if (isNaN(hgt)) {
    return false;
  }
  if (minHeight > hgt || maxHeight < hgt) {
    return false;
  }
  return true;
};

const validateInRange = (
  [min, max]: [number, number],
  val: number | string
) => {
  let compareValue: number;
  if (typeof val === "string") {
    const parsedValue = parseInt(val, 10);
    if (isNaN(parsedValue)) {
      return false;
    }
    compareValue = parsedValue;
  } else {
    compareValue = val;
  }
  return min <= compareValue && compareValue <= max;
};

const validateEyeColor = (eyeColor) => {
  const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  return eyeColors.some((ec) => ec === eyeColor);
};

const validatePassportId = (pid) => {
  const pidRegexMatch = /^([0-9]{9})$/.exec(pid);
  if (pidRegexMatch === null) {
    return false;
  }
  return true;
};

interface Passport {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
}
const passportFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
// split a line with multiple passport fields into one field per line
const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .replace(/\s/g, "\n")
  .split("\n");

// const getRegexNumericMatchOrZero = (value: string, pattern: RegExp) => {
//   const match = pattern.exec(value);
//   if (match === null) {
//     return 0;
//   }
//   const parsedNumber = parseInt(match[0]);
//   if (isNaN(parsedNumber)) {
//     return 0;
//   }
//   return parsedNumber;
// };
const isMissingField = (passport: Passport) => {
  const s = Object.values(passport);
  return s.some((v) => v === undefined);
};
const isValid = (passport: Passport) => {
  if (isMissingField(passport)) {
    return false;
  }

  if (!validateBirthYear(passport.byr)) {
    return false;
  }

  if (!validateExpirationYear(passport.eyr)) {
    return false;
  }

  if (!validateIssueYear(passport.iyr)) {
    return false;
  }

  if (!validateEyeColor(passport.ecl)) {
    return false;
  }

  if (!validateHairColor(passport.hcl)) {
    return false;
  }

  if (!validateHeight(passport.hgt)) {
    return false;
  }

  if (!validatePassportId(passport.pid)) {
    return false;
  }

  // //   const byrRegexMatch = /^[(\d)]{4}$/.exec(passport.byr);
  // const byr = getRegexNumericMatchOrZero(passport.byr, /^[(\d)]{4}$/);
  // //   const byr = byrRegexMatch ? parseInt(byrRegexMatch[0]) : 0;
  // if (1920 > byr || byr > 2002) {
  //   return false;
  // }
  // const iyrRegexMatch = /^[(\d)]{4}$/.exec(passport.iyr);
  // const iyr = parseInt(iyrRegexMatch[1]);
  // if (2010 > iyr || iyr > 2020) {
  //   return false;
  // }

  // const eyrRegexMatch = /^[(\d)]{4}$/.exec(passport.eyr);
  // const eyr = parseInt(eyrRegexMatch[1]);
  // if (2020 > eyr || eyr > 2030) {
  //   return false;
  // }

  // const hgtRegexMatch = /(\d+)(cm|in)/.exec(passport.hgt);
  // if (hgtRegexMatch === null) {
  //   return false;
  // }
  // let hgtRange: [number, number];
  // switch (hgtRegexMatch[1]) {
  //   case "in":
  //     hgtRange = [56, 76];
  //     break;
  //   case "cm":
  //     hgtRange = [150, 193];
  //     break;
  //   default:
  //     return false;
  // }
  // const hgt = Number.parseInt(hgtRegexMatch[1]);
  // const [minHeight, maxHeight] = hgtRange;
  // if (isNaN(hgt)) {
  //   return false;
  // }
  // if (minHeight > hgt || maxHeight < hgt) {
  //   return false;
  // }

  // const hclRegexMatch = /#([0-9a-f]{6})/.exec(passport.hcl);
  // if (hclRegexMatch === null) {
  //   return false;
  // }

  // const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  // if (!eyeColors.some((ec) => ec === passport.ecl)) {
  //   return false;
  // }

  // const pidRegexMatch = /^([0-9]{9})$/.exec(passport.pid);
  // if (pidRegexMatch === null) {
  //   return false;
  // }
  return true;
};
let count = 0;
// let currentPassport: Passport = {};
let rawPassport = {};
for (let index = 0; index < lines.length; index++) {
  console.log(`Line index: ${index}`);
  const line = lines[index];

  console.log(`line: ${line}`);
  // end of current password
  if (line.length === 0) {
    console.log("End of passport detected.");
    console.log(`Total passport fields detected: ${passportFields}`);
    const pp: Passport = {
      byr: rawPassport["byr"],
      ecl: rawPassport["ecl"],
      eyr: rawPassport["eyr"],
      hcl: rawPassport["hcl"],
      hgt: rawPassport["hgt"],
      iyr: rawPassport["iyr"],
      pid: rawPassport["pid"],
    };
    const isValidPP = isValid(pp);
    if (isValidPP) {
      count++;
    }
    console.log(pp);
    rawPassport = {};
  } else {
    const lineRegexMatch = /^([a-z]{3}):(.+)$/.exec(line);
    const [key, value] = [lineRegexMatch[1], lineRegexMatch[2]];
    console.log(`Key: ${key} | Value: ${value}`);
    if (passportFields.some((ppf) => ppf === key)) {
      rawPassport[key] = value;
    }
  }
}
console.log(count);
