import fs from "fs";

interface IPerson {
  questions: Array<string[1]>;
}

interface IGroup {
  members: Array<IPerson>;
}

const getSumOfGroupYes = (group: IGroup) => {
  const memberCount = group.members.length;
  if (memberCount === 0) {
    return 0;
  }

  const [exampleMember, ...testMembers] = group.members;
  let yesQuestions = Object.keys(exampleMember.questions);
  testMembers.forEach((member) => {
    yesQuestions = Object.keys(member.questions).filter((q) =>
      yesQuestions.some((yq) => yq === q)
    );
  });

  return yesQuestions.length;
};

const solve = (): number => {
  const lines = fs.readFileSync("./input.txt").toString().split("\n");
  let currentGroup: IGroup = {
    members: [],
  };
  let solution = 0;
  lines.forEach((line, i) => {
    if (line.length === 0) {
      solution += getSumOfGroupYes(currentGroup);
      currentGroup.members = [];
    } else {
      const person: IPerson = {
        questions: [],
      };
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        person.questions[line[charIndex]] = 1;
      }
      currentGroup.members.push(person);
    }
  });
  solution += getSumOfGroupYes(currentGroup);

  return solution;
};

console.log(`Solution ${solve()}`);
