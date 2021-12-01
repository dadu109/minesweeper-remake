import { generateRandomNumbers } from "./utils/generate-random-numbers";

export function generateMinesweeperGrid({
  rows,
  cols,
  mines,
}: GenerateMinesweeperGridConfig): Cell[][] {
  const minesPositions = generateRandomNumbers({
    amount: mines,
    min: 0,
    max: rows * cols - 1,
  });

  const cellGrid = generateCellGrid({ rows, cols });
  const cellGridWithMines = populateCellGridWithMines(cellGrid, minesPositions);
  const cellGridWithNeighbours =
    populateGridWithNieghboursAmounts(cellGridWithMines);

  return cellGridWithNeighbours;
}

function generateCellGrid({ rows, cols }: GenerateCellGridConfig): Cell[][] {
  const cellArray: Cell[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        row: i,
        col: j,
        visited: false,
        flagged: false,
        isMine: false,
        numberOfNeighbouringMines: null,
      });
    }
    cellArray.push(row);
  }
  return cellArray;
}

function populateGridWithNieghboursAmounts(cellGrid: Cell[][]): Cell[][] {
  const cellGridWithNeighbours = [...cellGrid];
  for (let i = 0; i < cellGrid.length; i++) {
    for (let j = 0; j < cellGrid[i].length; j++) {
      const cell = cellGrid[i][j];

      const neighbours = getNeighbouringMinesAmount(cell, cellGrid);
      cellGridWithNeighbours[i][j].numberOfNeighbouringMines = neighbours;
    }
  }
  return cellGridWithNeighbours;
}

function populateCellGridWithMines(
  cellGrid: Cell[][],
  minesPositions: number[]
): Cell[][] {
  const cellGridWithMines = [...cellGrid];

  for (let i = 0; i < cellGrid.length; i++) {
    for (let j = 0; j < cellGrid[i].length; j++) {
      const cell = cellGrid[i][j];
      cell.isMine = minesPositions.includes(cell.row * cell.col);
    }
  }

  return cellGridWithMines;
}

function getNeighbouringMinesAmount(
  cell: Cell,
  cellGrid: Cell[][]
): number | null {
  if (cell.isMine) return null;

  const cellsAround = [
    cellGrid[cell.row - 1] && cellGrid[cell.row - 1][cell.col - 1],
    cellGrid[cell.row - 1] && cellGrid[cell.row - 1][cell.col],
    cellGrid[cell.row - 1] && cellGrid[cell.row - 1][cell.col + 1],
    cellGrid[cell.row] && cellGrid[cell.row][cell.col - 1],
    cellGrid[cell.row] && cellGrid[cell.row][cell.col + 1],
    cellGrid[cell.row + 1] && cellGrid[cell.row + 1][cell.col - 1],
    cellGrid[cell.row + 1] && cellGrid[cell.row + 1][cell.col],
    cellGrid[cell.row + 1] && cellGrid[cell.row + 1][cell.col + 1],
  ].filter(Boolean);

  return cellsAround.filter((cell) => cell.isMine).length;
}
