import React, { useEffect, useCallback } from "react";
import { useDebounceCallback } from "../../hooks/useDebounce";
import TopBar from "../../containers/TopBarContainer";
import PhotoGrid from "../PhotoGrid";
import { loadingStatus, galleryMode } from "../../redux/modules/gallery";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import config from "../../../config";
import theme from "../../css/app.css";
import styles from "./styles.css";

const INFINITE_DB_TIMEOUT = 75;

const params = {
  client_id: config.clientId,
  per_page: 12
};

function Gallery({ selectedGallery, ...props }) {
  if (!selectedGallery) {
    selectedGallery = {};
    props.initGallery(props.query);
  }

  // scroll events fire very often and sometimes component doesn't rerender
  // quick enough to receive new prop for loading status
  const nextPage = useDebounceCallback(props.fetchPhotos, INFINITE_DB_TIMEOUT, {
    leading: true,
    trailing: false
  });

  useInfiniteScroll(
    { isLoading: selectedGallery.status !== loadingStatus.continue },
    () => nextPage(params)
  );

  useEffect(() => {
    const cantScroll = document.body.scrollHeight < window.innerHeight;
    if (cantScroll) {
      props.fetchPhotos(params);
    }
  }, [selectedGallery]);

  return (
    <div>
      <TopBar />
      <div className={theme.container} style={{ paddingTop: "7.15rem" }}>
        <PhotoGrid photos={selectedGallery.photos} />
      </div>
      {selectedGallery.status === loadingStatus.loading && (
        <div className={styles.loadingArea}>Loading...</div>
      )}
    </div>
  );
}

export default Gallery;
