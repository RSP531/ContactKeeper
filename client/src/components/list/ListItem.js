import React, { useContext } from "react";
import ListContext from "../../context/list/listContext";

const ListItem = ({ dragCard, itemId, item, trackerID }) => {
  const listContext = useContext(ListContext);
  const { deleteItem } = listContext;

  const releaseCard = () => {
    // console.log("itemId", itemId);
    // console.log("trackerID", trackerID);
  };

  return (
    <div
      id={trackerID}
      className="itemCard"
      onDragStart={e => dragCard(e, itemId)}
      draggable
      onMouseUp={releaseCard}
    >
      {item}
      <i
        className="fas fa-times cardIcon hoverEffect"
        onClick={() => deleteItem(itemId)}
      ></i>
    </div>
  );
};

export default ListItem;
