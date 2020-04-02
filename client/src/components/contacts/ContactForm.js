import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "Personal"
  });

  const { firstName, lastName, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    contactContext.addContact(contact);
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };

  return (
    <form>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={firstName}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={lastName}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="Personal"
        checked={type === "Personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="Professional"
        checked={type === "Professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default ContactForm;
