import { connect } from "react-redux";
import {
  setAllOrder,
  getSelectedMode,
  getGalleries
} from "../redux/modules/gallery";
import TopBar from "../components/TopBar";

function mapStateToProps(state) {
  return {
    selectedMode: getSelectedMode(state),
    allOrderBy: getGalleries(state).all.params.order_by
  };
}

export default connect(
  mapStateToProps,
  { setAllOrder }
)(TopBar);
