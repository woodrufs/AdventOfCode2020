import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import fs from "fs";
import { exit } from "process";

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

let solution = { row: 0, seat: 0, seatId: 0 };

const orderedSeats = seatInfo.sort((s1, s2) => {
  if (s1.row > s2.row) {
    return 1;
  }
  if (s2.row > s1.row) {
    return -1;
  }

  if (s1.seat > s2.seat) {
    return 1;
  }

  return -1;
});

// loops through rows 2 - 127
// since it's a full flight, only one row should have less than 8 seats
for (let i = 2; i < 128; i++) {
  const seats = orderedSeats
    .filter((s) => {
      return i === s.row;
    })
    .map((s) => s.seat);

  if (seats.length === 8) {
    continue;
  }

  for (let j = 0; j < 8; j++) {
    var exists = seats.some((s) => s === j);
    if (exists === false) {
      solution.row = i;
      solution.seat = j;
      solution.seatId = i * 8 + j;
      console.log(`Missing seat found: ${JSON.stringify(solution)}`);
      exit(0);
    }
  }
}
