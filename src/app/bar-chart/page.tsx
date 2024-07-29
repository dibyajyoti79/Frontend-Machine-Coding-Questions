"use client";
import { useEffect, useState } from "react";

const BarChart = () => {
  const [frequency, setFrequency] = useState<{ [key: string]: number }>();
  const [yAxis, setYAxis] = useState<number[]>([]);
  const fetchNumbers = async () => {
    const url =
      "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";
    const res = await fetch(url);
    let data = await res.text();
    let dataArr = data.split("\n").filter(Boolean);
    const map: { [key: string]: number } = {};
    dataArr.forEach((item: string) => {
      if (map[item]) {
        map[item] = map[item] + 1;
      } else {
        map[item] = 1;
      }
    });
    setFrequency(map);
  };
  const handleRefresh = () => {
    fetchNumbers();
  };
  //preparing y-axis data
  useEffect(() => {
    if (frequency) {
      const max = Math.max(...Object.values(frequency));
      const maxVal = Math.ceil(max / 10) * 10;
      let arr: number[] = [];
      for (let i = maxVal / 10; i >= 0; i--) {
        arr.push(i * 10);
      }
      setYAxis(arr);
    }
  }, [frequency]);

  useEffect(() => {
    fetchNumbers();
  }, []);
  return (
    <div className="flex items-center justify-center m-6">
      <div className="flex flex-col items-center w-full h-screen">
        <h1 className="text-4xl font-semibold">Bar Chart</h1>
        <div className="w-[90%] md:w-1/2 h-1/3 mt-12">
          <div className="flex border-l-2 border-b-2 w-full h-full relative">
            <div className="absolute flex flex-col bottom-0 -left-8 justify-between items-center h-full">
              {yAxis.map((val, ind) => (
                <div key={ind}>
                  <span>{val}</span>
                </div>
              ))}
            </div>
            {frequency &&
              Object.entries(frequency).map(([key, val]) => (
                <div className="flex-1 relative flex flex-col items-center">
                  <div
                    className="w-5 bg-pink-600 absolute bottom-0 transition-height"
                    style={{
                      height: `${(val / yAxis[0]) * 100}%`,
                    }}
                  >
                    <span className="text-sm absolute -top-5">{val}</span>
                  </div>
                  <div className="absolute -bottom-8">{key}</div>
                </div>
              ))}
          </div>
        </div>
        <button className="btn btn-secondary mt-20" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
};
export default BarChart;
