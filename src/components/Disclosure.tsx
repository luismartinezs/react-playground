import { useState } from "react";

const Disclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-controls="widget"
        className="button"
      >
        Open
      </button>
      {isOpen && <div id="widget">Content</div>}
    </>
  );
};

export default Disclosure;
