import React, { useRef, useContext } from "react";
import ListContext from "../../context/list/listContext";

const AddItem = ({ listNumber }) => {
  const listContext = useContext(ListContext);

  const text = useRef("");

  const { addItem } = listContext;

  // const onChange = e => {
  //   console.log(text.current.value);
  //   console.log("target", e.target.value, listNumber);
  // };

  const submitForm = e => {
    e.preventDefault();
    console.log(text.current.value);
    addItem({ listItem: text.current.value, list: listNumber });
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
