import { useState } from "react";
import { getRandomSudoku } from "../randomSudoku";

function Board() {
  const [error, setError] = useState<any>(false);
  const [squares, setSquares] = useState<any>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) {
    return setSquares((prev: any) => {
      const newSquares = [...prev];
      newSquares[i][j] = e.target.value;
      return newSquares;
    });
  }

  function clearSudoku() {
    setSquares([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  }

  function generateSudoku() {
    setSquares(getRandomSudoku());
  }

  function solveSudoku() {
    setError(false);
    const newSquares = [...squares];
    const emptyCells = findEmptyCells(newSquares);

    if (emptyCells.length === 0) {
      return setSquares(newSquares);
    }

    const [row, col] = emptyCells[0];
    for (let num = 1; num <= 9; num++) {
      if (isValid(newSquares, row, col, num)) {
        newSquares[row][col] = num;
        solveSudoku();
        if (findEmptyCells(newSquares).length === 0) {
          return setSquares(newSquares);
        }
        newSquares[row][col] = 0;
      }
    }
    setError(true);
    return;
  }

  function isValid(squares: any, row: number, col: number, num: number) {
    for (let i = 0; i < 9; i++) {
      //Checking x axis
      if (squares[row][i] === num) {
        return false;
      }
      //Checking y axis
      if (squares[i][col] === num) {
        return false;
      }

      //Checking 3x3 grid
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (squares[i][j] === num) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function findEmptyCells(squares: any) {
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (squares[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    return emptyCells;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[360px] h-[360px] lg:w-[400px] lg:h-[400px] rounded-md border border-white/50">
        <div className="flex flex-col h-full">
          {squares.map((square: number[], i: number) => {
            return (
              <div
                key={i}
                className={`${
                  i == 2 || i == 5 ? " border-b border-white" : ""
                } flex w-full h-full`}
              >
                {square.map((cell: any, j: number) => {
                  return (
                    <input
                      type="number"
                      maxLength={1}
                      key={j}
                      value={cell}
                      onChange={(e) => handleChange(e, i, j)}
                      className={`${
                        j == 2 || j == 5
                          ? "border border-zinc-700 border-r border-r-white"
                          : "border border-zinc-700"
                      } bg-inherit text-center w-full text-xl hover:bg-zinc-700 focus:bg-zinc-700 outline-none duration-200 cursor-default`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        {error && (
          <div className="text-red-500 text-lg text-center mt-2">
            No Solution !
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-between">
        <button
          onClick={generateSudoku}
          className="px-3 py-2 rounded-md mt-12 bg-green-700 border border-white border-opacity-0 hover:border-opacity-100 duration-200 flex items-center justify-center w-1/3"
        >
          Random
        </button>
        <button
          onClick={clearSudoku}
          className="px-3 py-2 rounded-md mt-12 bg-red-700 border border-white border-opacity-0 hover:border-opacity-100 duration-200 flex items-center justify-center"
        >
          Clear
        </button>
        <button
          onClick={solveSudoku}
          className="px-3 py-2 rounded-md mt-12 bg-blue-700 border border-white border-opacity-0 hover:border-opacity-100 duration-200 flex items-center justify-center w-1/3"
        >
          Solve Sudoku
        </button>
      </div>
    </div>
  );
}

export default Board;
