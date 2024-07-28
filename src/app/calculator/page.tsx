"use client";

import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

const arr = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "/",
  "*",
  "=",
  "C",
  ".",
];
const page = () => {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue
      .split("")
      .filter((char) => arr.includes(char))
      .join("");
    setValue(filteredValue);
  };
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e.target);
    const id = (e.target as HTMLButtonElement).id;
    if (id === "C") {
      setValue("");
    } else if (id === "=") {
      calculate();
    } else {
      setValue((val) => val + id);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculate();
  };
  const calculate = () => {
    const ans = eval(value);
    setValue(ans);
  };
  return (
    <div className="flex items-center justify-center m-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Calculator</h1>
        <form onSubmit={handleSubmit} className="mt-10">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs h-16"
            value={value}
            onChange={handleChange}
          />
          <div className="mt-10 grid grid-cols-4 gap-4" onClick={handleClick}>
            {arr.map((item, index) => (
              <button
                id={item}
                key={item}
                className="btn btn-neutral"
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
export default page;
