import { connect } from "react-redux";
import { setToken } from "../redux/modules/app";
import AuthScreen from "../components/AuthScreen";

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setToken: s => dispatch(setToken(s))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
