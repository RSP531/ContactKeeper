import React, { useReducer } from "react";
import axios from "axios";
import ListContext from "./listContext";
import listReducer from "./listReducer";
import { UPDATE_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_ERROR } from "../types";

const ListState = props => {
  const initialState = {
    list: [],
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
  const deleteItem = async id => {
    //let item = { id: id, item: currentArray };
    console.log(id);
    try {
      await axios.delete(`/api/items/${id}`);
      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ITEMS_ERROR,
        payload: err.response.msg
      });
    }
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
