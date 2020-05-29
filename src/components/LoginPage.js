import React, { useState, useLayoutEffect } from "react";
import { Link, navigate } from "gatsby";
import userbase from "userbase-js";
import Header from "./Header";

const LoginPage = ({ user, setUser }) => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("idle");
  const formDisabled = status !== "idle";

  useLayoutEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const username = event.target.elements.usernameInput.value;
    const password = event.target.elements.passwordInput.value;

    try {
      console.log("Sign in");
      setError(false);
      setStatus("pending");

      const user = await userbase.signIn({ username, password });

      console.log("Sign in succeeded", user.username);
      setUser(user);
      setStatus("idle");
    } catch (error) {
      console.log("Sign in failed:", error.message);
      setError(error);
      setStatus("idle");
    }
  };

  return (
    <>
      <Header title="Login" />

      <form onSubmit={handleSubmitLogin}>
        <label>
          Username: <br />
          <input
            type="text"
            aria-label="Username"
            id="usernameInput"
            name="username"
            disabled={formDisabled}
          />
        </label>

        <br />
        <br />

        <label>
          Password: <br />
          <input
            type="password"
            aria-label="Password"
            id="passwordInput"
            name="password"
            disabled={formDisabled}
          />
        </label>

        <br />
        <br />

        {error && (
          <>
            <small>{error.message}</small>
            <br />
            <br />
          </>
        )}

        <button type="submit" disabled={formDisabled}>
          Log In
        </button>
        <small>
          {" "}
          or <Link to="/app/signup">sign up</Link>
        </small>
      </form>
    </>
  );
};

export default LoginPage;
