import fs from "fs";
import readLine from "readline-promise";
const userInputInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines = fs.readFileSync("Expenses.txt").toString().split("\n");

const runFunc = async () => {
  const userInput = parseInt(
    await userInputInterface.questionAsync(
      "How many expenses do we want to sum to get 2020 (2 or 3)?"
    )
  );
  if (isNaN(userInput)) {
    retryInput();
  }
  switch (userInput) {
    case 2:
    case 3:
      getSolution(lines, userInput);
      break;
    default:
      retryInput();
      break;
  }
};

const retryInput = () => {
  console.log("Value provided must be 2 or 3.");
  runFunc();
};

const getSolution = function (expenses: string[], entriesToSum: number) {
  const totalExpenses = expenses.length;
  for (let x = 0; x < totalExpenses; x++) {
    const currentExpenses: number[] = [parseInt(expenses[x])];

    for (let y = x + 1; y < totalExpenses; y++) {
      currentExpenses.push(parseInt(expenses[y]));
      if (entriesToSum == 3) {
        for (let z = y + 1; z < totalExpenses; z++) {
          currentExpenses.push(parseInt(expenses[z]));
          validateAnswer(currentExpenses);
          currentExpenses.pop();
        }
      } else {
        validateAnswer(currentExpenses);
      }
      currentExpenses.pop();
    }
    currentExpenses.pop();
  }
};

const getSum = (entries: number[]): number => {
  return entries.reduce((prev, current) => {
    return prev + current;
  });
};

const getProduct = (entries: number[]): number => {
  return entries.reduce((prev, current) => {
    return prev * current;
  });
};

const checkEntries = (entries: number[]): [boolean, number?] => {
  const sum = getSum(entries);
  if (sum === 2020) {
    const product = getProduct(entries);
    return [true, product];
  }

  return [false];
};

const validateAnswer = (expenses: number[]) => {
  const [success, product] = checkEntries(expenses);
  if (success) {
    console.log(`Product: ${product}`);
    process.exit(0);
  }
};
runFunc();
