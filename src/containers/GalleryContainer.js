import { connect } from "react-redux";
import {
  initGallery,
  fetchPhotos,
  selectMode,
  setAllOrder
} from "../redux/modules/gallery";
import AuthScreen from "../components/Gallery";

function mapStateToProps(state) {
  return {
    gallery: state.gallery
  };
}

export default connect(
  mapStateToProps,
  { initGallery, fetchPhotos, selectMode, setAllOrder }
)(AuthScreen);
