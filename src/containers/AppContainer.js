import { connect } from "react-redux";
import { setToken } from "../redux/modules/app";
import App from "../components/App";

function mapStateToProps(state) {
  return {
    ...state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
