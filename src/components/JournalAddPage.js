import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import userbase from "userbase-js";

import Header from "./Header";

const JournalAddPage = ({ user }) => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("idle");
  const formDisabled = status === "pending";

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmitNewEntry = async (event) => {
    event.preventDefault();

    console.log("Insert new entry");

    const dateInputEl = event.target.elements.dateInput;
    const entryInputEl = event.target.elements.entryInput;
    const date = dateInputEl.value;
    const entry = entryInputEl.value;

    try {
      setError(false);
      setStatus("adding");

      await userbase.insertItem({
        databaseName: "entries",
        item: { date: date, entry: entry },
      });
      console.log("Insert entry succeeded");
      navigate("/app");
    } catch (error) {
      console.log("Insert entry failed");

      setError(error);
      setStatus("idle");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();

    navigate("/app");
  };

  return (
    <>
      <Header title="Add" />

      <form onReset={handleCancel} onSubmit={handleSubmitNewEntry}>
        <p>
          <input
            id="dateInput"
            defaultValue={new Date().toISOString().slice(0, 10)}
            type="date"
            aria-label="Date"
            required
            disabled={formDisabled}
          />
        </p>

        <p>
          <textarea
            id="entryInput"
            type="text"
            aria-label="Entry"
            required
            rows="10"
            disabled={formDisabled}
          />
        </p>

        {error && <p>{error.message}</p>}

        <button type="reset" disabled={formDisabled}>
          Cancel
        </button>

        <button type="submit" disabled={formDisabled}>
          Add
        </button>
      </form>
    </>
  );
};

export default JournalAddPage;
