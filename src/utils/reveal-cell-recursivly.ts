import { GridState } from "..";

type RevealedDict = {[key: number]: {[key: number]: boolean}};

export const revealCellRecursivly = (cell: Cell, revealedDict: RevealedDict, grid: GridState) => {
    const neighbours = [
        [cell.row - 1, cell.col],
        [cell.row + 1, cell.col],
        [cell.row, cell.col - 1],
        [cell.row, cell.col + 1],
        [cell.row + 1, cell.col + 1],
        [cell.row - 1, cell.col + 1],
        [cell.row + 1, cell.col - 1],
        [cell.row - 1, cell.col - 1],
    ]
    let revealedCellsCount: number = 1;
  
    grid[cell.row][cell.col].visited = true;
  
    for (const [x, y] of neighbours) {
      if (grid[x] === undefined || grid[x][y] === undefined) continue;
      if (!revealedDict[x]) { revealedDict[x] = {} } 
      else if (revealedDict[x][y]) continue;
      
      const newCell = grid[x][y];
      revealedDict[x][y] = true;
      
      if (!newCell.isMine && newCell.numberOfNeighbouringMines === 0) {
          const {revealedCells: cellsCount} = revealCellRecursivly(newCell, revealedDict, grid);
          revealedCellsCount += cellsCount;
      } else if (!newCell.isMine && newCell.numberOfNeighbouringMines > 0) {
          newCell.visited = true;
          revealedCellsCount++;
      }
    }
  
    return {grid, revealedCells: revealedCellsCount};
}