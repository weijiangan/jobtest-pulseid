import React from "react";
import styles from "./styles.css";

const tags = ["People", "Nature", "Skyline", "Abstract", "Animals", "Travel"];

function Nav({ query, setQuery, selectedMode, selectMode }) {
  return (
    <ul className={styles.nav} data-testid="entries">
      <li className={selectedMode === "all" ? styles.active : undefined}>
        <button type="button" onClick={() => selectMode("all")}>
          All
        </button>
      </li>
      {tags.map(tag => (
        <li
          key={tag}
          className={
            selectedMode === "search" &&
            query.toLowerCase() === tag.toLowerCase()
              ? styles.active
              : undefined
          }
        >
          <button
            type="button"
            onClick={() => {
              selectMode("search");
              setQuery(tag.toLowerCase());
            }}
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Nav;
