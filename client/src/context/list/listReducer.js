import { UPDATE_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case UPDATE_ITEM:
      return {
        ...state,
        list: state.list.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        list: state.list.filter(item => item._id !== action.payload),
        loading: false
      };
    case ITEMS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
