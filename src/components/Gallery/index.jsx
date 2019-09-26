import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import PhotoGrid from "../PhotoGrid";
import NavContainer from "../../containers/NavContainer";
import { loadingStatus } from "../../redux/modules/gallery";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useDebounce } from "../../hooks/useDebounce";
import config from "../../../config";
import styles from "./styles.css";

const sortOptions = ["latest", "oldest", "popular"];
const SEARCH_DB_TIMEOUT = 500;
const INFINITE_DB_TIMEOUT = 75;

function Gallery({ gallery, ...props }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDbQuery] = useDebounce(query, SEARCH_DB_TIMEOUT);
  const galleryName = gallery.selectedMode === "all" ? "all" : debouncedQuery;
  let selectedGallery = gallery.galleries[galleryName];
  if (!selectedGallery) {
    selectedGallery = {};
    props.initGallery(debouncedQuery);
  }

  const params = {
    client_id: config.clientId,
    per_page: 12,
    query: debouncedQuery || undefined
  };

  const nextPage = useCallback(
    // scroll events fire very often and sometimes component doesn't rerender
    // quick enough to receive new prop for loading status
    debounce(props.fetchPhotos, INFINITE_DB_TIMEOUT, {
      leading: true,
      trailing: false
    }),
    [props.fetchPhotos]
  );

  useInfiniteScroll(
    { isLoading: selectedGallery.status !== loadingStatus.continue },
    () => nextPage(params)
  );

  const dbSelectMode = useCallback(
    debounce(props.selectMode, SEARCH_DB_TIMEOUT),
    []
  );

  const handleSearch = useCallback(event => {
    setQuery(event.target.value);
    dbSelectMode("search");
  });

  useEffect(() => {
    const cantScroll = document.body.scrollHeight < window.innerHeight;
    if (cantScroll && selectedGallery.status === loadingStatus.continue) {
      if (gallery.selectedMode === "search" && debouncedQuery === "") return;
      props.fetchPhotos(params);
    }
  }, [selectedGallery]);

  const sortSelect = (
    <div className={styles.flexFixed}>
      <span className={styles.mr1}>Sort by </span>
      <select
        value={gallery.galleries.all.params.order_by}
        onChange={e => props.setAllOrder(e.target.value)}
      >
        {sortOptions.map(option => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <input
            className={styles.searchBox}
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search images..."
          />
          <div className={styles.flexBaseline}>
            <div className={styles.navWrapper}>
              <NavContainer query={debouncedQuery} setQuery={setDbQuery} />
            </div>
            {gallery.selectedMode === "all" && sortSelect}
          </div>
        </div>
      </div>
      <div className={styles.container} style={{ marginTop: "7.15rem" }}>
        <PhotoGrid photos={selectedGallery.photos || []} />
      </div>
      {selectedGallery.status === loadingStatus.loading && (
        <div className={styles.loadingArea}>Loading...</div>
      )}
    </div>
  );
}

export default Gallery;
