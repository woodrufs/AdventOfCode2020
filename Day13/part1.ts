import fs from "fs";

const exec = (fileName: string) => {
  const [lineOne, lineTwo] = fs.readFileSync(fileName).toString().split("\n");
  const originalTimestamp = parseInt(lineOne, 10);
  const busses = lineTwo.match(/([\d]+)/g).map((bus) => parseInt(bus, 10));
  const [firstBus] = busses
    .map((bus) => {
      return {
        id: bus,
        nextDeparture: Math.ceil(originalTimestamp / bus) * bus,
      };
    })
    .sort((a, b) => {
      return a.nextDeparture - b.nextDeparture;
    });
  return (firstBus.nextDeparture - originalTimestamp) * firstBus.id;
};

console.log(exec("input.txt"));
