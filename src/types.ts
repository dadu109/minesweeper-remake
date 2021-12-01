type Cell = {
  row: number;
  col: number;
  visited: boolean;
  flagged: boolean;
  isMine: boolean;
  numberOfNeighbouringMines?: number;
};

type GenerateCellGridConfig = {
  rows: number;
  cols: number;
};

type GenerateRandomNubersConfig = {
  amount: number;
  min: number;
  max: number;
};

type GenerateMinesweeperGridConfig = {
  rows: number;
  cols: number;
  mines: number;
};
