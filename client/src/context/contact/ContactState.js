import React, { useReducer } from "react";
import uuid from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types.js";
import { getMaxListeners } from "cluster";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        firstName: "Ross",
        lastName: "Geller",
        email: "rGeller@gmail.com",
        phone: "234-567-8980",
        type: "Personal"
      },
      {
        id: 2,
        firstName: "Avatar",
        lastName: "Aang",
        email: "AvatarAang@gmail.com",
        phone: "123-456-7890",
        type: "Professional"
      },
      {
        id: 3,
        firstName: "Katara",
        lastName: "WaterBender",
        email: "Katara@gmail.com",
        phone: "123-451-2359",
        type: "Professional"
      },
      {
        id: 4,
        firstName: "Toph",
        lastName: "Beifong",
        email: "toph_earth@gmail.com",
        phone: "834-234-6234",
        type: "Professional"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //List of all the actions

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
