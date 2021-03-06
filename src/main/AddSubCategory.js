import React, {Component} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Label from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {
    POPULATE_KEY_ADD_SUBCATEGORY,
    POPULATE_KEY_FETCH_CATEGORIES,
    POPULATE_KEY_LOG_IN,
    TYPE_ADD_SUBCATEGORY,
    TYPE_FETCH_CATEGORIES,
    TYPE_LOG_IN
} from "../redux/actions/constants";
import {popUp} from "../utils/Util";
import {doFetchAllCategories, doPostSubCategoryByCategoryId} from "../redux/actions/serverActions";
import {updateResources} from "../redux/actions/populateActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {decrypt} from "../redux/crypting/crypt";

class AddSubCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subCategory: "",
            selectedCategory: null
        }
    }

    componentStyle = {
        marginTop: "10px",
    };

    commonMargin = {
        marginTop: "10px",
        display: "block"
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

    dropDownItem = {
        display: "block",
        marginLeft: "10px",
        fontSize: "14px",
        color: "#303030"
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
            subCategoryAdded
        } = this.props;

        const {
            subCategoryAdded: nextSubCategoryAdded
        } = nextProps;

        if (!subCategoryAdded && nextSubCategoryAdded && nextSubCategoryAdded === "success") {
            this.guestPage();
        }
    }

    componentDidMount() {
        const {
            doFetchAllCategories
        } = this.props;

        const authToken = decrypt(window.sessionStorage.getItem("token"));
        const userId = decrypt(window.sessionStorage.getItem("userId"));

        if (!authToken) {
            this.logoutUser();
        } else {
            doFetchAllCategories(userId, POPULATE_KEY_FETCH_CATEGORIES, TYPE_FETCH_CATEGORIES);
        }
    }

    componentWillUnmount() {
        const {
            updateResources
        } = this.props;

        updateResources(null, POPULATE_KEY_ADD_SUBCATEGORY, TYPE_ADD_SUBCATEGORY);
    }

    generateSubCategory() {
        return (
            <div style={this.componentStyle}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <Label>Podkategorija</Label>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.category} onChange={(event) => this.activitySelectSubCategory(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </div>
        )
    }

    activitySelectSubCategory(event) {
        this.setState({subCategory: event.target.value});
    }

    guestPage() {
        const {
            history
        } = this.props;

        history.push("/guests");
    }

    addCategoryPage() {
        const {
            history
        } = this.props;

        history.push("/addCategory");
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
                    <Button onClick={() => this.addCategoryPage()}
                            style={this.buttonStyle}
                            variant="primary"
                            type="button">Dodaj kategoriju</Button>
                </div>
            </div>
        )
    }

    generateCategories(categoriesData) {
        const {
            selectedCategory
        } = this.state;

        let selectedCategoryWrite = null;

        if (selectedCategory === "" || !selectedCategory) {
            selectedCategoryWrite = "Izaberi kategoriju..."
        } else {
            categoriesData && categoriesData.forEach((categoryData) => {
                if (categoryData.get("id") === selectedCategory) {
                    selectedCategoryWrite = categoryData.get("name");
                }
            });
        }

        const categoriesJsx = [];
        categoriesData.forEach((category) => {
            const categoryName = category.get("name");
            const dataJsx = (
                <Dropdown.Item
                    key={"category-" + category.get("id")}
                    style={this.dropDownItem}
                    onClick={() => this.selectCategoryId(category)}>
                    {categoryName}
                </Dropdown.Item>);
            categoriesJsx.push(dataJsx);
        });

        return (
            <div style={this.commonMargin}>
                <Label>Kategorija</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedCategoryWrite}>
                    {categoriesJsx}
                </DropdownButton>
            </div>
        );
    }

    selectCategoryId(category) {
        const categoryId = category.get("id");
        this.setState({selectedCategory: categoryId})
    }


    saveSubCategory() {
        const {
            doPostSubCategoryByCategoryId
        } = this.props;

        const {
            subCategory,
            selectedCategory
        } = this.state;

        if (!selectedCategory || selectedCategory === "") {
            popUp("Greska", "Kategorija nije izabrana", null, true);
        } else if (!subCategory || subCategory === "") {
            popUp("Greska", "Podkategorija nije uneta", null, true);
        } else {
            doPostSubCategoryByCategoryId(
                subCategory,
                selectedCategory,
                POPULATE_KEY_ADD_SUBCATEGORY,
                TYPE_ADD_SUBCATEGORY
            );
        }
    }

    render() {
        const {
            categories,
        } = this.props;

        const {
            selectedCategory
        } = this.state;


        //Setting up categories
        let categoriesJsx = null;
        if (categories && categories.size !== 0 && categories !== "error") {
            categoriesJsx = this.generateCategories(categories);
        } else if (categories && categories === "error") {
            this.addCategoryPage();
        }

        const titleJsx = (
            <div style={this.title}>Add SubCategory</div>
        );

        const saveJsx = (
            <div>
                <hr/>
                <Button onClick={() => this.saveSubCategory()}>Sacuvaj!</Button>
            </div>
        );

        return (
            <div style={this.panelStyle}>
                {this.generateButtonPanel()}
                <hr/>
                {titleJsx}
                {categoriesJsx}
                {selectedCategory ? this.generateSubCategory() : null}
                {saveJsx}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const categories = state.datareducer.get(POPULATE_KEY_FETCH_CATEGORIES);
    const subCategoryAdded = state.datareducer.get(POPULATE_KEY_ADD_SUBCATEGORY);

    return {
        categories,
        subCategoryAdded
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doFetchAllCategories,
        doPostSubCategoryByCategoryId,
        updateResources
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubCategory);