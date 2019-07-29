import React, {Component} from "react";
import {doLogin} from "../redux/actions/serverActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoginForm from ".././forms/LoginForm";
import {
    POPULATE_KEY_LOG_IN,
    POPULATE_KEY_USER_DETAILS,
    TYPE_LOG_IN,
    TYPE_USER_DETAILS
} from "../redux/actions/constants";
import {updateResources} from "../redux/actions/populateActions";

class Home extends Component {

  col_md_12 = {
    alignItems: "center",
    textAlign: "center",
    color: "red",
    fontSize: "18px"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  nextPath() {
    const {
      history
    } = this.props;

    history.push("/guests");
  }

  handleClick() {
    const {
      doLogin
    } = this.props;

    doLogin(this.state, POPULATE_KEY_LOG_IN, TYPE_LOG_IN);
  }

    componentWillMount() {
        const {
            updateResources
        } = this.props;

        updateResources(null, POPULATE_KEY_USER_DETAILS, TYPE_USER_DETAILS);
    }

  handleKeyPress = (e) => {
    const {
      doLogin
    } = this.props;

    if (e.key === "Enter") {
      doLogin(this.state, POPULATE_KEY_LOG_IN, TYPE_LOG_IN);
    }
  };

  updatePassword(event) {
    this.setState({password: event.target.value})
  }

  updateEmail(event) {
    this.setState({email: event.target.value})
  }

  render() {
    const {
        authToken,
        userDetails
    } = this.props;

    const formJsx = [];
    formJsx.push(
        <LoginForm
            key={"loginForm"}
            changePassword={event => this.updatePassword(event)}
            changeEmail={event => this.updateEmail(event)}
            click={() => this.handleClick()}
            keyPress={this.handleKeyPress}
            email={this.state.email}
            password={this.state.password}
        />);

    if (authToken === "error") {
      formJsx.push(
          <div key={"errorMsg"} className="page-header" style={this.col_md_12}>
            <small>Bad credential (email/password)!</small>
          </div>
      )
    } else if (authToken && userDetails) {
      this.nextPath();
    }

    return (
        <div>
          {formJsx}
        </div>
    );
  }
}

const mapStateToProps = state => {
  const authToken = state.loginReducer.get(POPULATE_KEY_LOG_IN);
  const userDetails = state.datareducer.get(POPULATE_KEY_USER_DETAILS);

  return {
    authToken,
    userDetails
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      doLogin,
      updateResources
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);