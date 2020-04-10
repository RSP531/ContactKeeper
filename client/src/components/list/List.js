import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ListItem from "./ListItem";
import ListContext from "../../context/list/listContext";

const List = ({ title, sentArray, listNumber }) => {
  const listContext = useContext(ListContext);
  const authContext = useContext(AuthContext);

  const { updateItem, getItems } = listContext;

  useEffect(() => {
    authContext.loadUser();
    getItems();
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
      onDrop={e => dropCard(e, title)}
      // draggable
    >
      <h1 className="text-dark text-center">List {listNumber}</h1>
      {sentArray.map((item, index) => (
        <ListItem
          key={index}
          dragCard={dragCard}
          itemId={item._id}
          item={item.listItem}
        />
      ))}
    </div>
  );
};

export default List;
