import React, { useReducer } from "react";
// import axios from "axios";
import ListContext from "./listContext";
import listReducer from "./listReducer";
import { UPDATE_ARRAY, ADD_ITEM, DELETE_ITEM } from "../types";

const ListState = props => {
  const initialState = {
    arry1: [
      { id: 1, item: "bananas", list: 1 },
      { id: 2, item: "bread", list: 1 },
      { id: 3, item: "biscuits", list: 1 },
      { id: 4, item: "baking-soda", list: 1 }
    ],
    arry2: [
      { id: 5, item: "cookies", list: 2 },
      { id: 6, item: "cream", list: 2 },
      { id: 7, item: "cake", list: 2 },
      { id: 8, item: "canada", list: 2 }
    ],
    arry3: [
      { id: 9, item: "apples", list: 3 },
      { id: 10, item: "apricots", list: 3 },
      { id: 11, item: "arugula", list: 3 }
    ],
    list: [
      { id: 1, item: "bananas", list: 1 },
      { id: 2, item: "bread", list: 1 },
      { id: 3, item: "biscuits", list: 1 },
      { id: 4, item: "baking-soda", list: 1 },
      { id: 5, item: "cookies", list: 2 },
      { id: 6, item: "cream", list: 2 },
      { id: 7, item: "cake", list: 2 },
      { id: 8, item: "canada", list: 2 },
      { id: 9, item: "apples", list: 3 },
      { id: 10, item: "apricots", list: 3 },
      { id: 11, item: "arugula", list: 3 }
    ],
    loading: true
  };

  const [state, dispatch] = useReducer(listReducer, initialState);

  //List of all the actions

  const updateArray = (currentArray, futureArray) => {
    let data = { currentArray, futureArray };
    dispatch({ type: UPDATE_ARRAY, payload: data });
  };

  //add item to the array
  const addItem = (id, futureArray) => {
    let test = state.list.filter(item => {
      if (item.id == id) {
        return item;
      }
    });
    let temp = { id: id, item: test[0].item, list: futureArray };
    dispatch({ type: ADD_ITEM, payload: temp });
  };

  //delete the item from current array
  const deleteItem = (id, currentArray) => {
    let item = { id: id, item: currentArray };
    dispatch({ type: DELETE_ITEM, payload: item });
  };

  return (
    <ListContext.Provider
      value={{
        arry1: state.arry1,
        arry2: state.arry2,
        arry3: state.arry3,
        loading: state.loading,
        list: state.list,
        addItem,
        deleteItem
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
