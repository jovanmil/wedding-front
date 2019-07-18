import React, {Component} from "react";
import {doLogin, TYPE_LOG_IN} from "../redux/actions/loginActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoginForm from ".././forms/LoginForm";
import {POPULATE_KEY_LOG_IN} from "../redux/actions/constants";

class Home extends Component {

    col_md_12 = {
        alignItems: "center",
        textAlign: "center",
        color: "red"
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

        history.push("/main");
    }

    handleClick() {
        const {
            doLogin
        } = this.props;

        doLogin(this.state, POPULATE_KEY_LOG_IN, TYPE_LOG_IN);
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
            userAuth
        } = this.props;

        console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK " + userAuth)


        const formJsx = [];
        formJsx.push(<LoginForm
            key={"loginForm"}
            changePassword={event => this.updatePassword(event)}
            changeEmail={event => this.updateEmail(event)}
            click={() => this.handleClick()}
            keyPress={this.handleKeyPress}
            email={this.state.email}
            password={this.state.password}
        />);

        if (userAuth && userAuth.get("email") && userAuth.get("email") !== "") {
            alert("OK")
            this.nextPath()
        } else if (userAuth === false) {
            formJsx.push(
                <div key={"errorMsg"} className="page-header" style={this.col_md_12}>
                    <small>Wrong token!</small>
                </div>
            )
        }

        return (
            <div>
                {formJsx}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);