import fs from "fs";
import _ from "lodash";

enum Actions {
  N,
  E,
  S,
  W,
  L,
  R,
  F,
}

type ActionType = keyof typeof Actions;
interface ICoords {
  x: number;
  y: number;
}
interface IShip {
  coords: ICoords;
  waypoint: ICoords;
  takeAction: (action: ActionType, movement: number) => void;
  moveShip: (movement: number) => void;
  rotateWaypoint: (direction: "L" | "R", degrees: number) => void;
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
    coords: { x: 0, y: 0 },
    waypoint: { x: 10, y: 1 },
    moveShip: (movement: number) => {
      const { coords, waypoint } = ship;
      coords.x += waypoint.x * movement;
      coords.y += waypoint.y * movement;
    },
    rotateWaypoint: (direction: "L" | "R", degrees: number) => {
      const rotations = (degrees / 90) % 4;
      let { waypoint } = ship;
      for (let rotation = 0; rotation < rotations; rotation++) {
        let { x, y } = waypoint;
        const holder = x;
        if (direction === "L") {
          waypoint.x = y * -1;
          waypoint.y = holder;
        } else {
          waypoint.x = y;
          waypoint.y = holder * -1;
        }
      }
    },
    takeAction: (action: ActionType, movement: number) => {
      const { waypoint } = ship;
      switch (action) {
        case "N":
          waypoint.y += movement;
          break;
        case "S":
          waypoint.y -= movement;
          break;
        case "E":
          waypoint.x += movement;
          break;
        case "W":
          waypoint.x -= movement;
          break;
        case "F":
          ship.moveShip(movement);
          break;
        case "L":
          ship.rotateWaypoint(action, movement);
          break;
        case "R":
          ship.rotateWaypoint(action, movement);
          break;
        default:
          break;
      }
    },
  };

  for (const direction of directions) {
    ship.takeAction(direction[0], direction[1]);
  }
  const {
    coords: { x, y },
  } = ship;
  return Math.abs(x) + Math.abs(y);
};

console.log(exec("input.txt"));
