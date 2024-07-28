"use client";

import { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center justify-center m-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Star Ratings</h1>
        <div className="mt-10">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className=""
              onClick={() => setRating(num)}
              onMouseOver={() => setHover(num)}
              onMouseLeave={() => setHover(rating)}
            >
              <span
                className={`text-4xl m-3 ${
                  num <= hover ? "text-yellow-600" : "text-gray-400"
                }`}
              >
                &#9733;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StarRating;
