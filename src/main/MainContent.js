import React, {Component} from "react";
import {doLogin} from "../redux/actions/loginActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {POPULATE_KEY_LOG_IN} from "../redux/actions/constants";

class MainContent extends Component {
    render() {
        return (
            <div>Sample content</div>
        )
    }
}

const mapStateToProps = state => {
    const userAuth = state.loginReducer.get(POPULATE_KEY_LOG_IN);
    return {
        userAuth
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doLogin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);