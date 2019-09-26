import { connect } from "react-redux";
import { initGallery, fetchPhotos, selectMode } from "../redux/modules/gallery";
import AuthScreen from "../components/Gallery";

function mapStateToProps(state) {
  return {
    gallery: state.gallery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initGallery: n => dispatch(initGallery(n)),
    fetchPhotos: p => dispatch(fetchPhotos(p)),
    selectMode: m => dispatch(selectMode(m))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
