import React from "react";
import { Link } from "gatsby";

const EXCERPT_LENGTH = 150;

const Entries = ({ entries }) => {
  return (
    <>
      <h2>Entries</h2>

      <ul>
        {entries
          .sort((entryA, entryB) =>
            entryA.item.date > entryB.item.date ? -1 : 1
          )
          .map((entry) => (
            <li key={entry.itemId}>
              <p>
                <Link to={`/app/${entry.itemId}`}>
                  {entry.item.date || "No date"}
                </Link>
                <span> &middot; </span>
                {entry.item.entry.substring(0, EXCERPT_LENGTH)}
                {entry.item.entry.length > EXCERPT_LENGTH && "..."}
              </p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Entries;
