import fs, { Dir } from "fs";
import _ from "lodash";

enum TurnActions {
  L,
  R,
  F,
}

enum DirectionActions {
  N,
  E,
  S,
  W,
}

type ActionType = keyof typeof DirectionActions | keyof typeof TurnActions;
interface IShip {
  facing: DirectionActions;
  x: number;
  y: number;
  takeAction: (action: ActionType, movement: number) => void;
}

const exec = (fileName: string) => {
  let directions = fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((line) => {
      const match = line.match(/([NSEWLRF]+)([\d]+)/);
      return [match[1], parseInt(match[2])] as [ActionType, number];
    });
  const ship: IShip = {
    facing: DirectionActions.E,
    x: 0,
    y: 0,
    takeAction: (action: ActionType, movement: number) => {
      switch (action) {
        case "N":
          ship.y += movement;
          break;
        case "S":
          ship.y -= movement;
          break;
        case "E":
          ship.x += movement;
          break;
        case "W":
          ship.x -= movement;
          break;
        case "F":
          switch (ship.facing) {
            case DirectionActions.N:
              ship.y += movement;
              break;
            case DirectionActions.S:
              ship.y -= movement;
              break;
            case DirectionActions.E:
              ship.x += movement;
              break;
            case DirectionActions.W:
              ship.x -= movement;
              break;
          }
          break;
        case "L":
          ship.facing = ((movement / 90) * -1 + ship.facing + 4) % 4;
          // const rotate = (movement % 90) * -1;
          break;
        case "R":
          ship.facing = (movement / 90 + ship.facing + 4) % 4;
          // const rotate = (movement % 90) * -1;
          break;
        default:
          break;
      }
    },
  };

  for (const direction of directions) {
    const [e, x] = direction;
    ship.takeAction(direction[0], direction[1]);
  }
  return Math.abs(ship.x) + Math.abs(ship.y);
};

console.log(exec("input.txt"));
