import { connect } from "react-redux";
import { selectMode, setQuery, getQuery } from "../redux/modules/gallery";
import SearchInput from "../components/SearchInput";

function mapStateToProps(state) {
  return {
    query: getQuery(state)
  };
}

export default connect(
  mapStateToProps,
  { selectMode, setQuery }
)(SearchInput);
