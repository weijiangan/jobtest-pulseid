import Nav from "../components/Nav";
import { connect } from "react-redux";
import { selectMode } from "../redux/modules/gallery";

function mapStateToProps(state) {
  return {
    gallery: state.gallery
  };
}

export default connect(
  mapStateToProps,
  { selectMode }
)(Nav);
