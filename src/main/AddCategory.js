import React, {Component} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Label from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {doPostCategory} from "../redux/actions/serverActions";
import {
    POPULATE_KEY_ADD_CATEGORY,
    POPULATE_KEY_LOG_IN,
    TYPE_ADD_CATEGORY,
    TYPE_LOG_IN,
} from "../redux/actions/constants";
import {updateResources} from "../redux/actions/populateActions";
import {connect} from "react-redux";
import {popUp} from "../utils/Util";
import {decrypt} from "../redux/crypting/crypt";


class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: ""
        }
    }

    componentStyle = {
        marginTop: "10px",
    };

    title = {
        fontSize: "22px"
    };

    panelStyle = {
        marginTop: "20px",
        marginBottom: "20px",
    };

    buttonPanel = {
        marginTop: "20px",
        textAlign: "left",
        marginBottom: "20px"
    };

    span = {
        marginLeft: "5px",
        marginRight: "5px"
    };

    wrapper = {
        display: "inline"
    };

    logout = {
        float: "right",
        textDecoration: "underline",
        fontWeight: "bold",
        cursor: "pointer"
    };

    componentWillReceiveProps(nextProps) {
        const {
            categoryAdded
        } = this.props;

        const {
            categoryAdded: nextCategoryAdded
        } = nextProps;

        if (!categoryAdded && nextCategoryAdded && nextCategoryAdded === "success") {
            this.guestPage();
        }
    }

    componentDidMount() {
        const authToken = decrypt(window.sessionStorage.getItem("token"));

        if (!authToken) {
            this.logoutUser();
        }
    }

    componentWillUnmount() {
        const {
            updateResources
        } = this.props;

        updateResources(null, POPULATE_KEY_ADD_CATEGORY, TYPE_ADD_CATEGORY);
    }

    generateCategory() {
        return (
            <div style={this.componentStyle}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <Label>Kategorija</Label>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.category} onChange={(event) => this.activitySelectCategory(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </div>
        )
    }

    activitySelectCategory(event) {
        this.setState({category: event.target.value});
    }

    guestPage() {
        const {
            history
        } = this.props;

        history.push("/guests");
    }

    addSubCategoryPage() {
        const {
            history
        } = this.props;

        history.push("/addSubCategory");
    }

    logoutUser() {
        const {
            history,
            updateResources
        } = this.props;

        const result = {
            data: {
                "access_token": null
            }
        };
        updateResources(result, POPULATE_KEY_LOG_IN, TYPE_LOG_IN);
        history.push("/");
    }


    generateButtonPanel() {
        const userEmail = "(" + decrypt(window.sessionStorage.getItem("userEmail")) + ")";
        return (
            <div style={this.wrapper}>
                <div style={this.logout} onClick={() => this.logoutUser()}>{userEmail + " Logout"}</div>
                <div style={this.buttonPanel}>
                    <Button onClick={() => this.guestPage()}
                            style={this.buttonStyle}
                            variant="primary"
                            type="button">Gosti</Button>
                    <span style={this.span}/>
                    <Button onClick={() => this.addSubCategoryPage()}
                            style={this.buttonStyle}
                            variant="primary"
                            type="button">Dodaj podkategoriju</Button>
                </div>
            </div>
        )
    }

    saveCategory() {
        const {
            category
        } = this.state;

        const {
            doPostCategory
        } = this.props;

        const userId = decrypt(window.sessionStorage.getItem("userId"));

        if (!category || category === "") {
            popUp("Greska", "Pogresan unos za kategoriju", null, true);
        } else {
            doPostCategory(category, userId, POPULATE_KEY_ADD_CATEGORY, TYPE_ADD_CATEGORY);
        }
    }

    render() {
        const titleJsx = (
            <div style={this.title}>Dodaj kategoriju</div>
        );

        const saveJsx = (
            <div>
                <hr/>
                <Button onClick={() => this.saveCategory()}>Sacuvaj!</Button>
            </div>
        );

        return (
            <div style={this.panelStyle}>
                {this.generateButtonPanel()}
                <hr/>
                {titleJsx}
                {this.generateCategory()}
                {saveJsx}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const categoryAdded = state.datareducer.get(POPULATE_KEY_ADD_CATEGORY);

    return {
        categoryAdded
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doPostCategory,
        updateResources
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);