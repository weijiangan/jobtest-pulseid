import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
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
  const debouncedQuery = useDebounce(query, SEARCH_DB_TIMEOUT);
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
      if (props.selectedMode === "search" && !debouncedQuery) return;
      console.log("aaa");
      props.fetchPhotos(params);
    }
  });

  return (
    <div>
      <div className={styles.container}>
        <div style={{ margin: "1.5rem 0", display: "flex" }}>
          <div style={{ flex: "1 0 auto" }}>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search images..."
            />{" "}
            {debouncedQuery}
          </div>
          <div>
            <span style={{ marginRight: "0.5rem" }}>Sort by </span>
            <select>
              {sortOptions.map(option => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <PhotoGrid photos={selectedGallery.photos || []} />
      </div>
    </div>
  );
}

function PhotoGrid({ photos }) {
  return (
    <div className={styles.row}>
      {photos.map(photo => {
        return (
          <div className={styles.col} key={photo.id}>
            <div className={styles.thumb}>
              <Image src={photo.urls.small} color={photo.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Image(props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <img onLoad={() => setLoaded(true)} {...props} />
      <div
        className={styles.imgPlaceholder}
        style={{
          backgroundColor: props.color,
          opacity: loaded ? 0 : 1
        }}
      />
    </>
  );
}

export default Gallery;
