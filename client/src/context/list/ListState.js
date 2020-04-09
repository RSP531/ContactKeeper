import React, { useReducer } from "react";
// import axios from "axios";
import ListContext from "./listContext";
import listReducer from "./listReducer";
import { UPDATE_ITEM, DELETE_ITEM } from "../types";

const ListState = props => {
  const initialState = {
    list: [
      { id: "1", item: "bananas", list: "1" },
      { id: "2", item: "bread", list: "1" },
      { id: "3", item: "biscuits", list: "1" },
      { id: "4", item: "baking-soda", list: "1" },
      { id: "5", item: "cookies", list: "2" },
      { id: "6", item: "cream", list: "2" },
      { id: "7", item: "cake", list: "2" },
      { id: "8", item: "canada", list: "2" },
      { id: "9", item: "apples", list: "3" },
      { id: "10", item: "apricots", list: "3" },
      { id: "11", item: "arugula", list: "3" },
      { id: "12", item: "new", list: "4" }
    ],
    loading: true
  };

  const [state, dispatch] = useReducer(listReducer, initialState);

  //List of all the actions

  //update item to the array
  const updateItem = (id, futureArray) => {
    let test = state.list.filter(item => item.id === id);
    let temp = { id: id, item: test[0].item, list: futureArray };
    dispatch({ type: UPDATE_ITEM, payload: temp });
  };

  //delete the item from current array
  const deleteItem = id => {
    //let item = { id: id, item: currentArray };
    dispatch({ type: DELETE_ITEM, payload: id });
  };

  return (
    <ListContext.Provider
      value={{
        loading: state.loading,
        list: state.list,
        updateItem,
        deleteItem
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
