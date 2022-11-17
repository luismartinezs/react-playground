import React from "react";

type Props = {
  z: number | string;
  j?: number;
  i?: number;
};

const Box = ({ z, j = 0, i = 0 }: Props) => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        position: "absolute",
        top: j * 40,
        left: j * 10 + i * 38,
        zIndex: z,
      }}
      className="flex items-center justify-center text-white border border-2 border-indigo-500 bg-sky-500"
    >
      z-{z}
    </div>
  );
};

const StackingOrder = () => {
  const stackings = [
    [1, 2, 3],
    [3, 2, 1],
    [4, 1, 4],
  ];
  return (
    <div className="w-full h-[200px] border border-indigo-500">
      <h2>StackingOrder</h2>
      <div className="relative">
        {stackings.map((stacking, i) => {
          return (
            <div className="relative" key={i}>
              {stacking.map((z, j) => (
                <Box z={z} j={j} i={i} key={j} />
              ))}
            </div>
          );
        })}
      </div>
      <div className="relative left-40">
        <div className="relative z-0">
          <Box z={10} />
        </div>
        <div className="relative">
          <Box z={2} j={1} />
        </div>
      </div>
    </div>
  );
};

export default StackingOrder;
