import React, { useLayoutEffect, useState } from "react";
import { Router } from "@reach/router";
import userbase from "userbase-js";

import TodoListPage from "../components/TodoListPage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/Footer";
import LogoutPage from "../components/LogoutPage";
import ErrorPage from "../components/ErrorPage";

const App = () => {
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("initializing");

  useLayoutEffect(() => {
    const init = async () => {
      try {
        console.log("Init Userbase");

        const session = await userbase.init({
          appId: process.env.GATSBY_USERBASE_APP_ID,
        });

        console.log("Init Userbase succeeded");

        if (session.user) {
          console.log("with user", session.user.username);
          setUser(session.user);
        }

        setStatus("idle");
      } catch (error) {
        console.log("Init Userbase failed", error);
        setError(error);
        setStatus("idle");
      }
    };

    init();
  }, []);

  if (status === "initializing") {
    return <LoadingPage />;
  }

  return (
    <>
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <Router basepath="/app">
          <TodoListPage path="/" user={user} />
          <LoginPage path="/login" setUser={setUser} user={user} />
          <SignupPage path="/signup" setUser={setUser} user={user} />
          <LogoutPage path="/logout" setUser={setUser} user={user} />
        </Router>
      )}

      <br />

      <Footer setUser={setUser} user={user} />
    </>
  );
};

export default App;
