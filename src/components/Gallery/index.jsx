import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import { loadingStatus } from "../../redux/modules/gallery";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import config from "../../../config";
import styles from "./styles.css";

function Gallery({ gallery, ...props }) {
  const params = {
    client_id: config.clientId,
    page: gallery.page,
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

  useInfiniteScroll(
    { isLoading: gallery.status !== loadingStatus.continue },
    () => nextPage(params)
  );

  // fetch first photos
  useEffect(() => {
    nextPage(params);
  }, []);

  const [query, setQuery] = useState("");

  // for larger screens if the pictures don't fill the screen, keep loading
  // more photos
  const cantScroll = document.body.scrollHeight < window.innerHeight;
  if (
    gallery.page > 1 &&
    cantScroll &&
    gallery.status === loadingStatus.continue
  ) {
    nextPage(params);
  }

  return (
    <div>
      <div className={styles.container}>
        <input
          value={gallery.name}
          placeholder="Search images..."
          onChange={e => e.target.value}
        />
      </div>
      <div className={styles.container}>
        <PhotoGrid photos={gallery.photos} />
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
              <Image src={photo.urls.thumb} color={photo.color} />
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
