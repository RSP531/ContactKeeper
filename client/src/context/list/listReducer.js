import { UPDATE_ARRAY, UPDATE_ITEM } from "../types";

export default (state, action) => {
  switch (action.type) {
    case UPDATE_ARRAY:
      return {
        ...state,
        loading: false
      };
    case UPDATE_ITEM:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false
      };
    default:
      return state;
  }
};
