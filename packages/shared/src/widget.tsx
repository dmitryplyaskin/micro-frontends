import React, { useState } from "react";

const Clicker = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount((s) => s + 1)}>click + </button>
    </div>
  );
};
export default Clicker;
