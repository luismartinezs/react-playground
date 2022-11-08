import React from "react";

const LinkName = () => {
  return (
    <a href="#" aria-label="Autumn leaves">
      <span className="sr-only">Autumn comes</span>
      <img
        src="https://images.unsplash.com/photo-1667897810476-d0b6dea1f537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
        alt="cute leaves"
        height={100}
        width={200}
      />
    </a>
  );
};

export default LinkName;
