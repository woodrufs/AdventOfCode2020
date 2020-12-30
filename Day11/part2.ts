import fs from "fs";
import _ from "lodash";

type SeatingChart = Array<Array<string>>;
type Seat = { row; seatNo };
type Direction = { x; y };

class SeatingChartTool {
  getSeat(seatingChart: SeatingChart, seat: Seat) {
    return seatingChart[seat.row][seat.seatNo];
  }

  findNextVisibleSeat(
    seatingChart,
    currentSeat: Seat,
    direction: Direction
  ): "" | "L" | "#" {
    const totalRows = seatingChart.length;
    const nextSeat = {
      row: currentSeat.row + direction.x,
      seatNo: currentSeat.seatNo + direction.y,
    };
    // return empty string if we go out of bounds
    if (nextSeat.row < 0 || nextSeat.row > totalRows - 1) {
      return "";
    }
    const rowLength = seatingChart[nextSeat.row].length;

    if (nextSeat.seatNo < 0 || nextSeat.seatNo > rowLength - 1) {
      return "";
    }

    const value = seatingChart[nextSeat.row][nextSeat.seatNo];
    if (value === "#" || value === "L" || value === "") {
      return value;
    } else {
      return this.findNextVisibleSeat(seatingChart, nextSeat, direction);
    }
  }

  countVisibleSeats = (
    seatingChart: SeatingChart,
    currentSeat: Seat
  ): [openSeats: number, fullSeats: number] => {
    const surroundingSeats = [
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: -1, y: -1 }),
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: -1, y: 0 }),
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: -1, y: 1 }),
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: 0, y: 1 }),
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: 1, y: 1 }),
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: 1, y: 0 }),
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: 1, y: -1 }),
      this.findNextVisibleSeat(seatingChart, currentSeat, { x: 0, y: -1 }),
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
    let seatingChartChanged = false;
    for (let row = 0; row < newSeatingChart.length; row++) {
      for (let seatNo = 0; seatNo < newSeatingChart[row].length; seatNo++) {
        const seat: Seat = { row, seatNo };
        const currentSeatValue = this.getSeat(seatingChart, seat);
        const [, fullSeats] = this.countVisibleSeats(seatingChart, seat);

        if (currentSeatValue === "L" && fullSeats === 0) {
          this.setSeat(newSeatingChart, seat, "#");
          seatingChartChanged = true;
        } else if (currentSeatValue === "#" && fullSeats >= 5) {
          this.setSeat(newSeatingChart, seat, "L");
          seatingChartChanged = true;
        }
      }
    }

    return [newSeatingChart, seatingChartChanged];
  };

  copy = (seatingChart: SeatingChart) => _.cloneDeep(seatingChart);

  countSeats = (seatingChart: SeatingChart, char: "L" | "#") => {
    let count = 0;
    for (let row = 0; row < seatingChart.length; row++) {
      count += seatingChart[row].filter((c) => c === char).length;
    }

    return count;
  };
  setSeat = (
    seatingChart: SeatingChart,
    { row, seatNo }: Seat,
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
