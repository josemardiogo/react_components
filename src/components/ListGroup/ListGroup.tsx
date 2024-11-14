import { useState } from "react";
import "./ListGroup.css";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getMessage = () => {
    return items.length === 0 && <p>No item found</p>;
  };

  return (
    <>
      <h1>{heading}</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            className={`${
              index === selectedIndex && "active"
            } list-group-item cursor-pointer hover-li`}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
