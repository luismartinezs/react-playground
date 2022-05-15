import React, { useState, useEffect } from "react";

const useThing = () => {
  const [isThing, setIsThing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsThing(true);
    }, 500);
  });

  return isThing;
};

export default useThing;
