import IncreaseButton from "@/components/IncreaseButton";
import DecreaseButton from "@/components/DecreaseButton";
import CounterDisplay from "@/components/CounterDisplay";

const COUNTER_NUM = 3;

const CounterGame = () => {
  const counters = Array(COUNTER_NUM)
    .fill(null)
    .map((_, i) => <CounterDisplay key={i} count={0} />);

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-3xl">Counter game</h2>
      <div className="flex space-x-2">
        <IncreaseButton />
        <DecreaseButton />
      </div>
      <div className="flex space-x-2">{counters}</div>
    </div>
  );
};

export default CounterGame;
