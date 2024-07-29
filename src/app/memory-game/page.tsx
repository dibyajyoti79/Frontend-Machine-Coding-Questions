"use client";
import { useEffect, useState } from "react";
const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
};
const MemoryGame = () => {
  const [stage, setStage] = useState<"init" | "start" | "win">("init");
  const [nums, setNums] = useState(getNums());
  const [opened, setOpened] = useState<number[]>([]);
  const [solvedList, setSolvedList] = useState<number[]>([]);

  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  };
  const handleStart = () => {
    setStage("start");
    setNums(randomNums());
    setSolvedList([]);
    setOpened([]);
  };
  const handleClick = (num: number, index: number) => {
    if (opened.length === 2) return;
    setOpened((prev) => [...prev, index]);
  };

  const getClassName = (num: number, index: number) => {
    if (solvedList.includes(num)) {
      return "invisible";
    } else if (opened.includes(index)) {
      return "text-opacity-1";
    } else {
      return "text-opacity-0";
    }
  };

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        //if num equl than remove the cards
        if (nums[id1] === nums[id2]) {
          setSolvedList((prev) => [...prev, nums[id1]]);
        }
        setOpened([]);
      }, 1000);
    }
  }, [opened]);
  useEffect(() => {
    if (solvedList.length === 8) {
      setStage("win");
    }
  }, [solvedList]);
  return (
    <div className="flex items-center justify-center m-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Memory Game</h1>
        {stage === "init" && (
          <button className="btn btn-info mt-6" onClick={handleStart}>
            Play Game
          </button>
        )}
        {stage === "start" && (
          <div className="grid grid-cols-4 gap-4 mt-6">
            {nums.map((num, index) => (
              <button
                key={index}
                className={`btn btn-square btn-neutral ${getClassName(
                  num,
                  index
                )}`}
                onClick={() => handleClick(num, index)}
              >
                {num}
              </button>
            ))}
          </div>
        )}
        {stage === "win" && (
          <div className="flex flex-col items-center mt-6 gap-4">
            <h1>You won the Game!</h1>
            <button className="btn btn-success" onClick={handleStart}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MemoryGame;
