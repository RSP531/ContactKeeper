import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const List = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  let type = "Professional";
  let email = "monica@gmail.com";
  let phone = "111-111-1111";

  const dragOverStuff = e => {
    e.preventDefault();
  };

  const dragCard = (e, id) => {
    console.log(id);
    e.dataTransfer.setData("text/plain", id);
  };

  const dropCard = (e, text) => {
    console.log(text);
  };

  return (
    <div className="grid-3">
      <div className="listCard">
        <h1 className="text-dark text-center">Groceries</h1>
        <div
          key="Milk"
          className="itemCard"
          draggable
          onDragStart={e => dragCard(e, "milk")}
        >
          Milk
          <i className="fas fa-times cardIcon"></i>
        </div>
        <div className="itemCard">
          Salad
          <i className="fas fa-times cardIcon"></i>
        </div>
        <div className="itemCard">
          Salad
          <i className="fas fa-times cardIcon"></i>
        </div>
      </div>
      <div
        className="listCard"
        onDragOver={e => dragOverStuff(e)}
        onDrop={e => dropCard(e, "complete")}
      >
        {" "}
        test 3
      </div>
      <div className="listCard card bg-light">
        <h3 className="text-dark text-left">
          Monica Geller
          <span
            style={{ float: "right" }}
            className={
              "badge " +
              (type === "Professional" ? "badge-success" : "badge-primary")
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </h3>
        <ul className="list">
          {email && (
            <li>
              <i className="fas fa-envelope-open" /> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className="fas fa-phone" /> {phone}
            </li>
          )}
          <p>
            <button className="btn btn-dark btn-sm">Edit</button>
            <button className="btn btn-danger btn-sm">Delete</button>
          </p>
        </ul>
      </div>
    </div>
  );
};

export default List;
