import { UPDATE_ARRAY, ADD_ITEM, DELETE_ITEM } from "../types";

export default (state, action) => {
  switch (action.type) {
    case UPDATE_ARRAY:
      return {
        ...state,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        list: state.list.map(item =>
          item.id == action.payload.id ? action.payload : item
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        // contacts: state.contacts.filter(
        //   contact => contact._id !== action.payload
        // ),
        loading: false
      };
    default:
      return state;
  }
};
