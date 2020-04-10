import React, { useReducer } from "react";
import axios from "axios";
import ListContext from "./listContext";
import listReducer from "./listReducer";
import { UPDATE_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_ERROR } from "../types";

const ListState = props => {
  const initialState = {
    list: [
      { id: "1", listItem: "bananas", list: "1" },
      { id: "2", listItem: "bread", list: "1" },
      { id: "3", listItem: "biscuits", list: "1" },
      { id: "4", listItem: "baking-soda", list: "1" },
      { id: "5", listItem: "cookies", list: "2" },
      { id: "6", listItem: "cream", list: "2" },
      { id: "7", listItem: "cake", list: "2" },
      { id: "8", listItem: "canada", list: "2" },
      { id: "9", listItem: "apples", list: "3" },
      { id: "10", listItem: "apricots", list: "3" },
      { id: "11", listItem: "arugula", list: "3" },
      { id: "12", listItem: "new", list: "4" }
    ],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(listReducer, initialState);

  //List of all the actions

  // Get Contacts
  const getItems = async () => {
    try {
      const res = await axios.get("/api/items");
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEMS_ERROR,
        payload: err.response.msg
      });
    }
  };

  //update item to the array
  const updateItem = async item => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config);
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEMS_ERROR,
        payload: err.response.msg
      });
    }
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
        error: state.error,
        updateItem,
        deleteItem,
        getItems
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
