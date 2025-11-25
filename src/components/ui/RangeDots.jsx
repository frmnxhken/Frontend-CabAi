import React, { useState } from "react";

export default function RangeDots({ max = 15, defaultValue = 7 }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <div className="range-container">
        <div className="dots">
          {[...Array(max)].map((_, i) => (
            <div key={i} className={`dot ${i < value ? "active" : ""}`} />
          ))}
        </div>

        <input
          type="range"
          min="1"
          max={max}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
      </div>

      <p>Value: {value}</p>
    </div>
  );
}
