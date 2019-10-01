import React, { useState } from "react";
import styles from "./styles.css";

function PhotoGrid({ photos = [] }) {
  return (
    <div className={styles.row} data-testid="grid">
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

export function Image(props) {
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

export default PhotoGrid;
