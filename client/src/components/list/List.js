import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ListItem from "./ListItem";
import ListContext from "../../context/list/listContext";

const List = ({ title, sentArray, listNumber }) => {
  const listContext = useContext(ListContext);
  const authContext = useContext(AuthContext);

  const { updateItem } = listContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const dragOverStuff = e => {
    e.preventDefault();
  };

  const dragCard = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const dropCard = (e, futureHome) => {
    let id = e.dataTransfer.getData("text");
    updateItem(id, listNumber);
  };

  return (
    <div
      className="listCard"
      onDragOver={e => dragOverStuff(e)}
      onDrop={e => dropCard(e, title, "listCard")}
      // draggable
    >
      <h1 className="text-dark text-center">{title}</h1>
      {sentArray.map((item, index) => (
        <ListItem
          key={index}
          dragCard={dragCard}
          itemId={item.id}
          item={item.item}
        />
      ))}
    </div>
  );
};

export default List;
