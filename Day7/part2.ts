import fs from "fs";
import _ from "lodash";

interface IInnerBag {
  name: string;
  quantity: number;
}
type InnerBagCollection = Array<IInnerBag>;
type OuterBag = { name: string; bags: InnerBagCollection };

/** Recursive method that iterates through a specific color's inner bags (and each inner bag's bags)
 * until the desired color is found or no more inner bags are found.
 */
const countBags = (bags: Array<OuterBag>, currentColor: string): number => {
  const currentBag: OuterBag = _.get(bags, currentColor);
  if (!currentBag) {
    return 0;
  }
  let solution = 0;
  currentBag.bags.forEach((bag) => {
    solution += bag.quantity + bag.quantity * countBags(bags, bag.name);
  });

  return solution;
};

const bagRules = new Array<OuterBag>();
const lineRegExp = /([a-z]+ [a-z]+) bags contain (.*)\./;
const innerBagSeparatorRegExp = /([\d]+ ([a-z]+ [a-z]+))/g;
const innerBagRegExp = /([\d])+ ([a-z]+ [a-z]+)/;

const exec = (fileName: string, desiredColor: string): number => {
  const lines: Array<string> = fs.readFileSync(fileName).toString().split("\n");
  lines.forEach((line) => {
    const lineRegExpResults = lineRegExp.exec(line);
    const containingBagColor = lineRegExpResults[1];
    if (_.has(bagRules, containingBagColor) == false) {
      bagRules[containingBagColor] = {
        name: containingBagColor,
        bags: new Array<IInnerBag>(),
      };
    }
    const lineSuffix = lineRegExpResults[2];
    if (lineSuffix === "no other bags") {
    } else {
      const contents = lineSuffix.match(innerBagSeparatorRegExp);
      contents.forEach((bagData) => {
        const [, qty, name] = bagData.match(innerBagRegExp);
        bagRules[containingBagColor].bags.push({
          name,
          quantity: parseInt(qty),
        } as IInnerBag);
      });
    }

    // since regexp are stored outside of loop, we need to reset index
    lineRegExp.lastIndex = 0;
    innerBagSeparatorRegExp.lastIndex = 0;
  });
  const count = countBags(bagRules, desiredColor);

  return count;
};
const solution = exec("input.txt", "shiny gold");
console.log(solution);
