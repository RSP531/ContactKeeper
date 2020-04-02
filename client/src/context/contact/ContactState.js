import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types/types";

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
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //List of all the actions

  // Add Contact
  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
