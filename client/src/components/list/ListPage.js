import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import List from "./List";
import ListContext from "../../context/list/listContext";

const ListPage = () => {
  const listContext = useContext(ListContext);
  const authContext = useContext(AuthContext);

  const { list, getItems, loading } = listContext;

  useEffect(() => {
    authContext.loadUser();

    // eslint-disable-next-line
  }, []);

  // if (list !== null && !loading) {
  //   return (
  //     <div>
  //       Nothing Left
  //       <List title={"hi"} sentArray={[]} listNumber={"1"} />
  //     </div>
  //   );
  // } else {
  let stuff1 = list.filter(item => item.list === "1");
  let stuff2 = list.filter(item => item.list === "2");
  let stuff3 = list.filter(item => item.list === "3");

  return (
    <div className="grid-3">
      <List title={"Groceries Test1"} sentArray={stuff1} listNumber={"1"} />
      <List title={"Groceries Test2"} sentArray={stuff2} listNumber={"2"} />
      <List title={"Groceries Test3"} sentArray={stuff3} listNumber={"3"} />
    </div>
  );
};

export default ListPage;
