import fs from "fs";

const lines = fs.readFileSync("./input.txt").toString().split("\n");

const seatInfo = lines.map((l) => {
  let binaryValue = l.replace(/[F]/g, "0");
  binaryValue = binaryValue.replace(/[B]/g, "1");
  binaryValue = binaryValue.replace(/[L]/g, "0");
  binaryValue = binaryValue.replace(/[R]/g, "1");
  const row = parseInt(binaryValue.slice(0, 7), 2);
  const seat = parseInt(binaryValue.slice(7), 2);

  return {
    row,
    seat,
    seatId: row * 8 + seat,
  };
});

let solution = 0;
seatInfo.forEach((seat) => {
  if (seat.seatId > solution) {
    solution = seat.seatId;
  }
});

console.log(solution);
