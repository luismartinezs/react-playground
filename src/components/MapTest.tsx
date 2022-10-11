import { Fragment } from "react";

const MapTest = () => {
  const items = [
    { id: 0, name: "Item 1" },
    { id: 1, name: "Item 2" },
    { id: 2, name: "Item 3" },
    { id: 3, name: "Item 4" },
  ];

  const map = items.map((el) => (
    <Fragment key={el.id}>
      <span>{el.name}</span>
      <span>{el.name}</span>
    </Fragment>
  ));

  return map;
};

export default MapTest;
