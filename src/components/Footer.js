import React from "react";
import { Link } from "gatsby";

const Footer = ({ user }) => {
  return (
    <footer>
      <hr />
      <p>
        <small>
          {user && (
            <>
              Logged in as <strong>{user.username}</strong> -{" "}
              <Link to="/app/logout">Log out</Link>
              <br />
            </>
          )}
          <Link to="/">Back to website</Link>
        </small>
      </p>
    </footer>
  );
};

export default Footer;
