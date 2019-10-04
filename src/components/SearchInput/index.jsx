import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { galleryMode } from "../../redux/modules/gallery";
import { useDebounceCallback } from "../../hooks/useDebounce";
import config from "../../../config";
import styles from "./styles.css";

const SEARCH_DB_TIMEOUT = 500;

const params = {
  client_id: config.clientId,
  per_page: 12
};

function SearchInput(props) {
  const [query, setQuery] = useState("");

  const dbSelectMode = useDebounceCallback(props.selectMode, SEARCH_DB_TIMEOUT);
  const dbSetQuery = useDebounceCallback(props.setQuery, SEARCH_DB_TIMEOUT);

  const handleSearch = useCallback(event => {
    setQuery(event.target.value);
    dbSelectMode(galleryMode.search);
    dbSetQuery(event.target.value);
  });

  return (
    <input
      className={styles.searchBox}
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search images..."
    />
  );
}

export default SearchInput;
