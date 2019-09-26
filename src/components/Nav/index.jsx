import React from "react";
import styles from "./styles.css";

const tags = ["People", "Nature", "Skyline", "Abstract", "Animals", "Travel"];

function Nav({ query, setQuery, gallery, ...props }) {
  const { selectedMode } = gallery;

  return (
    <ul className={styles.nav}>
      <li className={selectedMode === "all" ? styles.active : undefined}>
        <button type="button" onClick={() => props.selectMode("all")}>
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
              props.selectMode("search");
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
