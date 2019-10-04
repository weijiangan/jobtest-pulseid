import { connect } from "react-redux";
import {
  initGallery,
  fetchPhotos,
  selectMode,
  setAllOrder,
  selectSelectedGallery,
  getQuery
} from "../redux/modules/gallery";
import AuthScreen from "../components/Gallery";

function mapStateToProps(state) {
  return {
    selectedGallery: selectSelectedGallery(state),
    query: getQuery(state)
  };
}

export default connect(
  mapStateToProps,
  { initGallery, fetchPhotos }
)(AuthScreen);
