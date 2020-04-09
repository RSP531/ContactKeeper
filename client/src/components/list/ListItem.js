import React, { useContext } from "react";
import ListContext from "../../context/list/listContext";

const ListItem = ({ index, dragCard, itemId, item }) => {
  const listContext = useContext(ListContext);

  return (
    <div
      key={index}
      className="itemCard"
      draggable
      onDragStart={e => dragCard(e, itemId)}
    >
      {item}
      <i className="fas fa-times cardIcon"></i>
    </div>
  );
};

export default ListItem;
