import React, { useLayoutEffect } from "react";
import { navigate, Link } from "gatsby";

import Header from "./Header";
import Entries from "./Entries";

const JournalPage = ({ user, entries }) => {
  useLayoutEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Header />

      <aside>
        <Link to="/app/add">+ Add journal entry</Link>
      </aside>

      {entries.length > 0 && <Entries entries={entries} />}
    </>
  );
};

export default JournalPage;
