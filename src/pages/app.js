import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import userbase from "userbase-js";

import JournalPage from "../components/JournalPage";
import JournalEntryPage from "../components/JournalEntryPage";
import JournalAddPage from "../components/JournalAddPage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/Footer";
import LogoutPage from "../components/LogoutPage";
import ErrorPage from "../components/ErrorPage";

const App = () => {
  const [user, setUser] = useState(false);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("pending");
  const loading = status === "pending";

  useEffect(() => {
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

  useEffect(() => {
    let ignore = false;

    const initEntries = async () => {
      console.log("Open database");

      setError(false);
      setStatus("pending");

      try {
        await userbase.openDatabase({
          databaseName: "journal",
          changeHandler: (data) => {
            console.log("Database changed", { ignore }, data);

            // This is needed so we do not
            // accidentally update an unmounted component.
            if (ignore) return;

            setEntries(data);
            setError(false);
            setStatus("idle");
          },
        });
      } catch (error) {
        console.log("Open database failed ", error);
        setError(error);
        setStatus("idle");
      }
    };

    if (user) {
      initEntries();
    } else {
      setEntries([]);
    }

    return () => {
      ignore = true;
    };
  }, [user]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <Router basepath="/app">
          <LoginPage path="/login" setUser={setUser} user={user} />
          <SignupPage path="/signup" setUser={setUser} user={user} />
          <LogoutPage path="/logout" setUser={setUser} user={user} />

          <JournalPage path="/" user={user} entries={entries} />
          <JournalAddPage path="/add" user={user} />
          <JournalEntryPage path="/:entryId" user={user} entries={entries} />
        </Router>
      )}

      <Footer user={user} />
    </>
  );
};

export default App;
