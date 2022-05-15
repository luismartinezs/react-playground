import useThing from "@/hooks/useThing";

const TheThing = () => {
  const isThing = useThing();

  if (isThing) {
    return <div>The Thing is true</div>;
  }

  return <div>Nothing</div>;
};

export default TheThing;
