import React, { useState, useLayoutEffect, useEffect } from "react";
import { navigate } from "gatsby";
import userbase from "userbase-js";

import Header from "./Header";

const LogoutPage = ({ user, setUser }) => {
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const logOut = async () => {
      try {
        console.log("Log out");
        await userbase.signOut();
        console.log("Logout succeeded");
        setUser(false);
      } catch (error) {
        console.log("Logout failed", error);
        setError(error);
      }
    };
    logOut();
  }, [setUser]);

  return (
    <>
      <Header title="Logout" />
      <p>{error ? error.message : "Logging out..."}</p>
    </>
  );
};

export default LogoutPage;
