import React from "react";

const Header = ({ title }) => {
  return <h1>Ugliest Todo App {title && ` / ${title}`}</h1>;
};

export default Header;
