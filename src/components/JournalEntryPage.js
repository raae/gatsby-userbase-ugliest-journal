import React, { useLayoutEffect } from "react";
import { navigate } from "gatsby";

import Header from "./Header";

const JournalEntryPage = ({ user, entryId, entries }) => {
  useLayoutEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const entry = entries.find((entry) => entry.itemId === entryId);

  if (!entry) {
    navigate("/app");
  }

  return (
    <>
      <Header title={entry.item.date} />
      <article>
        <p style={{ whiteSpace: "pre-wrap" }}>{entry.item.entry}</p>
      </article>
    </>
  );
};

export default JournalEntryPage;
