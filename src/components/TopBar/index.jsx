import React, { useState, useCallback } from "react";
import SearchInputContainer from "../../containers/SearchInputContainer";
import NavContainer from "../../containers/NavContainer";
import Select from "../Select";
import { galleryMode } from "../../redux/modules/gallery";
import theme from "../../css/app.css";
import styles from "./styles.css";

const sortOptions = ["latest", "oldest", "popular"];

function TopBar({ selectedMode, allOrderBy, setAllOrder }) {
  return (
    <div className={styles.topBar}>
      <div className={theme.container}>
        <SearchInputContainer />
        <div className={theme.flexBaseline}>
          <div className={styles.navWrapper}>
            <NavContainer />
          </div>
          {selectedMode === galleryMode.all && (
            <div className={theme.flexFixed}>
              <span className={theme.mr1}>Sort by </span>
              <Select
                value={allOrderBy}
                handleChange={e => setAllOrder(e.target.value)}
                options={sortOptions}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
