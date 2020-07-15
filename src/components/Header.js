import React from "react";
import { Link } from "gatsby";

const Header = ({ title }) => {
  if (title) {
    return (
      <h1>
        <Link to="/app">Ugliest Journal</Link> {title && ` / ${title}`}
      </h1>
    );
  } else {
    return <h1>Ugliest Journal</h1>;
  }
};

export default Header;
