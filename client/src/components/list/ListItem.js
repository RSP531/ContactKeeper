import React from "react";

const ListItem = ({ dragCard, itemId, item }) => {
  return (
    <div className="itemCard" onDragStart={e => dragCard(e, itemId)} draggable>
      {item}
      <i className="fas fa-times cardIcon"></i>
    </div>
  );
};

export default ListItem;
