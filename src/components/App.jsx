import React from "react";
import { hot } from "react-hot-loader/root";
import GalleryContainer from "../containers/GalleryContainer";
import "normalize.css";
import "../css/app.css";

function App() {
  return <GalleryContainer />;
}

export default hot(App);
