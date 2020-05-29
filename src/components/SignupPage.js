import React, { useState, useLayoutEffect } from "react";
import { Link, navigate } from "gatsby";
import userbase from "userbase-js";
import Header from "./Header";

const SignupPage = ({ user, setUser }) => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("idle");
  const formDisabled = status !== "idle";

  useLayoutEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();

    const username = event.target.elements.usernameInput.value;
    const email = event.target.elements.emailInput.value;
    const password = event.target.elements.passwordInput.value;

    try {
      console.log("Sign up");
      setError(false);
      setStatus("pending");

      const user = await userbase.signUp({ username, email, password });

      console.log("Sign up succeeded", user.username);
      setUser(user);
      setStatus("idle");
    } catch (error) {
      console.log("Sign up failed", error);
      setError(error);
      setStatus("error");
    }
  };

  return (
    <>
      <Header title="Signup" />

      <form onSubmit={handleSubmitSignUp}>
        <label>
          Username: <br />
          <input
            type="text"
            aria-label="Username"
            id="usernameInput"
            name="username"
            disabled={formDisabled}
            required
          />
        </label>

        <br />
        <br />

        <label>
          Email: <br />
          <input
            type="email"
            aria-label="Email"
            id="emailInput"
            name="email"
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
            required
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
          Sign Up
        </button>
        <small>
          {" "}
          or <Link to="/app/login">log in</Link>
        </small>
      </form>
    </>
  );
};

export default SignupPage;
