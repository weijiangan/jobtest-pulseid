import Nav from "../components/Nav";
import { connect } from "react-redux";
import { selectMode } from "../redux/modules/gallery";

function mapStateToProps(state) {
  return {
    gallery: state.gallery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectMode: m => dispatch(selectMode(m))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
