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
    const password = event.target.elements.passwordInput.value;

    try {
      console.log("Sign up");
      setError(false);
      setStatus("pending");

      const user = await userbase.signUp({ username, password });

      console.log("Sign up succeeded", user.username);
      setUser(user);
      setStatus("idle");
    } catch (error) {
      console.log("Sign up failed", error);
      setError(error);
      setStatus("idle");
    }
  };

  return (
    <>
      <Header title="Signup" />

      <form onSubmit={handleSubmitSignUp}>
        <p>
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
        </p>

        <p>
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
        </p>

        {error && (
          <p>
            <small>{error.message}</small>
          </p>
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
