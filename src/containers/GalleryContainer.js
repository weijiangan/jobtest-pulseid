import { connect } from "react-redux";
import {
  setName,
  setPhotos,
  addPhotos,
  setPage,
  setStatus,
  fetchPhotos
} from "../redux/modules/gallery";
import AuthScreen from "../components/Gallery";

function mapStateToProps(state) {
  return {
    gallery: state.gallery,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    example: arg => dispatch(setName(arg)),
    setPhotos: arr => dispatch(setPhotos(arr)),
    addPhotos: arr => dispatch(addPhotos(arr)),
    setPage: page => dispatch(setPage(page)),
    setStatus: s => dispatch(setStatus(s)),
    fetchPhotos: p => dispatch(fetchPhotos(p))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
