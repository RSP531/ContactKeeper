import React, { useRef, useContext, useEffect } from "react";
import ListContext from "../../context/list/listContext";
import AuthContext from "../../context/auth/authContext";

const AddItem = ({ listNumber }) => {
  const listContext = useContext(ListContext);
  const authContext = useContext(AuthContext);

  const text = useRef("");

  const { addItem, getItems } = listContext;

  useEffect(() => {
    authContext.loadUser();
    getItems();
    // eslint-disable-next-line
  }, []);

  // const onChange = e => {
  //   console.log(text.current.value);
  //   console.log("target", e.target.value, listNumber);
  // };

  const submitForm = e => {
    e.preventDefault();
    // console.log(text.current.value);
    addItem({ listItem: text.current.value, list: listNumber });
    text.current.value = "";
  };

  return (
    <div>
      <div className="input-icons">
        <i className="fa fa-plus-square icon" onClick={submitForm}></i>
        <input
          ref={text}
          className="input-field"
          type="text"
          // onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AddItem;
