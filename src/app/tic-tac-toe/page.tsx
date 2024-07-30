"use client";
import { MouseEvent, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const TicTacToe = () => {
  const { width, height } = useWindowSize();
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [won, setWon] = useState(null);
  const [winningRow, setWinnigRow] = useState<number[]>([]);

  const handleUserClick = (e: MouseEvent<HTMLDivElement>) => {
    if (won) return;
    const pos: string = (e.target as HTMLDivElement).id;
    if (matrix[parseInt(pos)] !== null) return;
    const copyMatrix = [...matrix];
    copyMatrix[parseInt(pos)] = isXTurn ? "X" : "O";
    setMatrix(copyMatrix);
    setIsXTurn((prevTurn) => !prevTurn);
  };
  const handleReset = () => {
    setMatrix(Array(9).fill(null));
    setWon(null);
    setWinnigRow([]);
    setIsXTurn(true);
  };
  useEffect(() => {
    // winner chances
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
        setWon(matrix[a]);
        setWinnigRow(lines[i]);
      }
    }
  }, [matrix]);
  return (
    <>
      <div className="flex items-center justify-center m-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">Tic Tac Toe</h1>
          <div
            className="grid grid-cols-3 grid-rows-3 mt-6"
            id="2"
            onClick={handleUserClick}
          >
            {matrix.map((item, index) => (
              <div
                key={index}
                id={index.toString()}
                className={`h-20 w-20 border border-gray-600 flex justify-center items-center text-2xl cursor-pointer ${
                  winningRow.length && winningRow.includes(index)
                    ? "bg-green-500 text-gray-950 hover:bg-green-500"
                    : "bg-neutral hover:bg-gray-500 hover:text-gray-950"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center mt-12 gap-2">
            <button
              className="btn btn-sm btn-neutral btn-error"
              onClick={handleReset}
            >
              Reset
            </button>
            <div>Next Player: {isXTurn ? "X" : "O"}</div>
            {won && <div>Player {won} won the Game</div>}
          </div>
        </div>
      </div>
      {won && <Confetti width={width} height={height} />}
    </>
  );
};
export default TicTacToe;
