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

function mapDispatchToProps(dispatch) {
  return {
    initGallery: n => dispatch(initGallery(n)),
    fetchPhotos: p => dispatch(fetchPhotos(p)),
    selectMode: m => dispatch(selectMode(m)),
    setAllOrder: o => dispatch(setAllOrder(o))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
