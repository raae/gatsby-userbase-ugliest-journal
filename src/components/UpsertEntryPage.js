import React, { useState, useEffect, useLayoutEffect } from "react";
import { navigate } from "gatsby";
import userbase from "userbase-js";

import TodoItem from "./TodoItem";
import LoadingPage from "./LoadingPage";
import Header from "./Header";
import ErrorPage from "./ErrorPage";

const JournalPage = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("initializing");

  useLayoutEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    let ignore = false;

    const initTodos = async () => {
      console.log("Open database");

      setError(false);
      setStatus("initializing");

      try {
        await userbase.openDatabase({
          databaseName: "todos",
          changeHandler: (data) => {
            console.log("Database changed", { ignore }, data);

            // This is needed so we do not
            // accidentally update an unmounted component.
            if (ignore) return;

            setTodos(data);
            setError(false);
            setStatus("idle");
          },
        });
      } catch (error) {
        console.log("Open database failed ", error);
        setError(error);
      }
    };

    initTodos();

    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmitNewTodo = async (event) => {
    event.preventDefault();

    console.log("Insert new todo");

    const todoInputEl = event.target.elements.todoInput;
    const todo = todoInputEl.value;

    try {
      setError(false);
      setStatus("adding");

      await userbase.insertItem({
        databaseName: "todos",
        item: { todo: todo },
      });
      console.log("Insert todo succeeded");

      todoInputEl.value = "";
      todoInputEl.focus();

      setStatus("idle");
    } catch (error) {
      console.log("Insert todo failed");

      setError(error);
      setStatus("idle");
    }
  };

  if (status === "initializing") {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <Header />

      {error && <p>{error.message}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.itemId}>
            <TodoItem {...todo} setError={setError} />
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmitNewTodo}>
        <label>
          <small>
            Add todo: <br />
          </small>
          <input
            id="todoInput"
            type="text"
            aria-label="Add todo"
            required
            placeholder="New To-Do"
            disabled={status !== "idle"}
          />
        </label>

        <button type="submit" disabled={status !== "idle"}>
          Add
        </button>
      </form>
    </>
  );
};

export default JournalPage;
