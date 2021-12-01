import { generateMinesweeperGrid } from "./generate-minesweeper-grid";


const minesweeperGrid = generateMinesweeperGrid({
  rows: 20,
  cols: 20,
  mines: 60,
});

for (const row of minesweeperGrid) {
  const div = document.createElement("div");

  for (const cell of row) {
    const span = document.createElement("span");
    span.textContent = cell.isMine ? "💣" : cell.numberOfNeighbouringMines.toString();
    span.classList.add("cell");
    div.appendChild(span);
  }

  document.body.appendChild(div);
}