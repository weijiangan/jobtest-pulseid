import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import { loadingStatus } from "../../redux/modules/gallery";
import config from "../../../config";
import styles from "./styles.css";

function Gallery(props) {
  const params = {
    client_id: config.clientId,
    page: props.gallery.page,
    per_page: 12,
    order_by: "latest"
  };

  const nextPage = useMemo(
    () =>
      // scroll events fire very often and sometimes state doesn't update
      // quick enough
      debounce(() => props.fetchPhotos(params), 500, {
        leading: true,
        trailing: false
      }),
    [props.fetchPhotos, params]
  );

  function handleSrollEnd() {
    const nearEnd =
      window.scrollY > document.body.scrollHeight - window.innerHeight - 500;
    if (nearEnd && props.gallery.status === loadingStatus.continue) {
      nextPage(params);
    }
  }

  // fetch first photos
  useEffect(() => {
    props.fetchPhotos(params);
  }, []);

  useEffect(() => {
    window.addEventListener("optimizedScroll", handleSrollEnd, false);
    return () => {
      window.removeEventListener("optimizedScroll", handleSrollEnd, false);
    };
  });

  const [query, setQuery] = useState("");

  // for larger screens if the pictures don't fill the screen, keep loading
  // more photos
  const cantScroll = document.body.scrollHeight < window.innerHeight;
  if (
    props.gallery.page > 1 &&
    cantScroll &&
    props.gallery.status === loadingStatus.continue
  ) {
    nextPage(params);
  }

  return (
    <div>
      <div className={styles.container}>
        <input
          value={props.gallery.name}
          placeholder="Search images..."
          onChange={e => e.target.value}
        />
      </div>
      <div className={styles.container}>
        <PhotoGrid photos={props.gallery.photos} />
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
              <img src={photo.urls.thumb} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
