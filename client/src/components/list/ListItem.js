import React from "react";

const ListItem = ({ index, dragCard, itemId, item }) => {
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
