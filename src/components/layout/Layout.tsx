import React from "react";
import NavBar from "./navBar/NavBar";
const Layout = ({ children }) => {
  return (
    <>
      <NavBar title="Select Skip" />
      <main>{children}</main>
    </>
  );
};

export default Layout;
