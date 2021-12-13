import { generateMinesweeperGrid } from "./generate-minesweeper-grid";
import { revealCellRecursivly } from "./utils/reveal-cell-recursivly";

export type GridState = Cell[][];
type MinesweeperConfig = {
  rows: number;
  cols: number;
  mines: number;
}
interface IMinesweeper {
  gameHistory: GridState[];
  gridState: GridState;
  revealCell: (x: number,y: number) => void;
  flagCell: (cell: Cell) => void;
  undo: () => void;
}
class Minesweeper implements IMinesweeper {
  gameHistory: GridState[] = [];
  gridState: GridState;

  constructor({rows, cols, mines}: MinesweeperConfig) {
    this.gridState = generateMinesweeperGrid({rows, cols, mines});
  }

  revealCell(x: number,y: number) {
    const cell = this.gridState[x][y];

    if (cell.isMine) {
      console.log("You lose!");
      return;
    }

    if (cell.numberOfNeighbouringMines === 0) {
      const revealedDict = {[cell.row]: {[cell.col]: true}};
      const gridCopy = [...this.gridState];

      this.gameHistory.push(gridCopy);

      const {grid,revealedCells} = revealCellRecursivly(cell, revealedDict, gridCopy);

      this.gridState = grid;
      return;
    }

    cell.visited = true;
  }

  flagCell(cell: Cell) {
  }

  undo() {
    this.gridState = this.gameHistory.pop();
  }

  render() {
    for (const row of this.gridState) {
      const div = document.createElement("div");
    
      for (const cell of row) {
        const span = document.createElement("span");
        span.textContent = cell.isMine
          ? "💣"
          : cell.numberOfNeighbouringMines.toString();
        span.style.backgroundColor = cell.visited ? "red" : "white";
        span.classList.add("cell");
        div.appendChild(span);
      }
    
      document.body.appendChild(div);
    }
  }
}

const minesweeper = new Minesweeper({
  rows: 20,
  cols: 20,
  mines: 50,
});

minesweeper.revealCell(5,7);
minesweeper.render();
