import { UPDATE_ITEM, DELETE_ITEM } from "../types";

export default (state, action) => {
  switch (action.type) {
    case UPDATE_ITEM:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false
      };
    default:
      return state;
  }
};
