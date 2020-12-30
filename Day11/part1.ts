import { count } from "console";
import { O_CREAT, SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import fs from "fs";
import _ from "lodash";

type SeatingChart = Array<Array<string>>;

class SeatingChartTool {
  countAdjacentSeats = (
    seatingChart: SeatingChart,
    row: number,
    seatNo: number
  ): [openSeats: number, fullSeats: number] => {
    const surroundingSeats = [
      this.getSeat(seatingChart, row - 1, seatNo - 1),
      this.getSeat(seatingChart, row - 1, seatNo),
      this.getSeat(seatingChart, row - 1, seatNo + 1),
      this.getSeat(seatingChart, row, seatNo - 1),
      this.getSeat(seatingChart, row, seatNo + 1),
      this.getSeat(seatingChart, row + 1, seatNo - 1),
      this.getSeat(seatingChart, row + 1, seatNo),
      this.getSeat(seatingChart, row + 1, seatNo + 1),
    ];

    return [
      surroundingSeats.filter((l) => l === "L").length,
      surroundingSeats.filter((l) => l === "#").length,
    ];
  };

  generateSeatingChart = (
    seatingChart: SeatingChart
  ): [seatingChart: SeatingChart, chartChanged: boolean] => {
    const newSeatingChart = this.copy(seatingChart);
    let chartChanged = false;
    for (let row = 0; row < newSeatingChart.length; row++) {
      for (let seatNo = 0; seatNo < newSeatingChart[row].length; seatNo++) {
        const currentSeatValue = this.getSeat(seatingChart, row, seatNo);
        const [openSeats, fullSeats] = this.countAdjacentSeats(
          seatingChart,
          row,
          seatNo
        );

        if (currentSeatValue === "L" && fullSeats === 0) {
          this.setSeat(newSeatingChart, row, seatNo, "#");
          chartChanged = true;
        } else if (currentSeatValue === "#" && fullSeats >= 4) {
          this.setSeat(newSeatingChart, row, seatNo, "L");
          chartChanged = true;
        }
      }
    }

    return [newSeatingChart, chartChanged];
  };

  getSeat = (seatingChart: SeatingChart, row: number, seatNo: number) => {
    try {
      const value = seatingChart[row][seatNo];
      return value || ".";
    } catch {
      return ".";
    }
  };

  copy = (seatingChart: SeatingChart) => _.cloneDeep(seatingChart);

  countSeats = (seatingChart: SeatingChart, char: "L" | "#") => {
    let count = 0;
    for (let i = 0; i < seatingChart.length; i++) {
      count += seatingChart[i].filter((c) => c === char).length;
    }

    return count;
  };
  setSeat = (
    seatingChart: SeatingChart,
    row: number,
    seatNo: number,
    value: "L" | "#"
  ) => {
    seatingChart[row][seatNo] = value;
  };
}

const exec = (fileName: string) => {
  let seatingChart: SeatingChart = fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((line) => {
      return line.split("");
    });
  let tool = new SeatingChartTool();
  let chartChanged = true;
  while (chartChanged) {
    [seatingChart, chartChanged] = tool.generateSeatingChart(seatingChart);
  }
  console.log(tool.countSeats(seatingChart, "#"));
};

console.log(exec("input.txt"));
