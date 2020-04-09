import React, { useContext } from "react";
import ListContext from "../../context/list/listContext";

const ListItem = ({ dragCard, itemId, item }) => {
  const listContext = useContext(ListContext);
  const { deleteItem } = listContext;

  return (
    <div className="itemCard" onDragStart={e => dragCard(e, itemId)} draggable>
      {item}
      <i
        className="fas fa-times cardIcon"
        onClick={() => deleteItem(itemId)}
      ></i>
    </div>
  );
};

export default ListItem;
