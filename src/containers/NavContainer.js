import Nav from "../components/Nav";
import { connect } from "react-redux";
import {
  selectMode,
  getSelectedMode,
  getQuery,
  setQuery
} from "../redux/modules/gallery";

function mapStateToProps(state) {
  return {
    selectedMode: getSelectedMode(state),
    query: getQuery(state)
  };
}

export default connect(
  mapStateToProps,
  { selectMode, setQuery }
)(Nav);
