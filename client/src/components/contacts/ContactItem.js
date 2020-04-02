import React from "react";
import PropTypes from "prop-types";

const ContactItem = ({
  contact: { id, lastName, firstName, email, phone, type }
}) => {
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {firstName} {lastName}{" "}
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
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
