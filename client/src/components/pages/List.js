import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const List = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>More Stuff</div>
      <div>Stuff</div>
    </div>
  );
};

export default List;
