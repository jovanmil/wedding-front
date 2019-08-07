import React, {Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Label from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {doFetchAllCategories, doFetchAllSubCategoriesByCategoryId, doPostGuest} from "../redux/actions/serverActions";
import {updateResources} from "../redux/actions/populateActions";
import {popUp} from "../utils/Util";
import {
    POPULATE_KEY_ADD_GUEST,
    POPULATE_KEY_FETCH_CATEGORIES,
    POPULATE_KEY_FETCH_SUBCATEGORIES,
    POPULATE_KEY_LOG_IN,
    POPULATE_KEY_USER_DETAILS,
    TYPE_ADD_GUEST,
    TYPE_FETCH_CATEGORIES,
    TYPE_FETCH_SUBCATEGORIES,
    TYPE_LOG_IN
} from "../redux/actions/constants";
import {connect} from "react-redux";
import {decrypt} from "../redux/crypting/crypt";

class AddGuest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            description: "",
            category: "",
            subcategory: "",
            invited: "false",
            confirmed: "unknown"
        }
    }

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


    componentDidMount() {
        const {
            doFetchAllCategories
        } = this.props;

        const authToken = decrypt(window.sessionStorage.getItem("token"));
        const userId = decrypt(window.sessionStorage.getItem("userId"));

        if (!authToken) {
            this.logoutUser();
        } else {
            doFetchAllCategories(userId, POPULATE_KEY_FETCH_CATEGORIES, TYPE_FETCH_CATEGORIES)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            guestAdded
        } = this.props;

        const {
            guestAdded: nextGuestAdded
        } = nextProps;

        if (!guestAdded && nextGuestAdded && nextGuestAdded === "success") {
            this.guestPage();
        }
    }

    componentWillUnmount() {
        const {
            updateResources
        } = this.props;

        const result = {
            data: ""
        };

        updateResources(result, POPULATE_KEY_FETCH_SUBCATEGORIES, TYPE_FETCH_SUBCATEGORIES);
        updateResources(null, POPULATE_KEY_ADD_GUEST, TYPE_ADD_GUEST);
    }

    title = {
        fontSize: "22px"
    };

    panelStyle = {
        marginTop: "20px",
        marginBottom: "20px",
    };

    componentStyle = {
        marginTop: "10px",
    };

    commonMargin = {
        marginTop: "10px",
        display: "block"
    };

    dropDownItem = {
        display: "block",
        marginLeft: "10px",
        fontSize: "14px",
        color: "#303030"
    };

    generateFirstName() {
        return (
            <div style={this.componentStyle}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <Label>Ime</Label>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.firstName} onChange={(event) => this.activitySelectFirstName(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </div>
        )
    }

    activitySelectFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    generateLastName() {
        return (
            <div style={this.componentStyle}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <Label>Prezime</Label>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.lastName} onChange={(event) => this.activitySelectLastName(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </div>
        )
    }

    activitySelectLastName(event) {
        this.setState({lastName: event.target.value});
    }

    generateDescription() {
        return (
            <div style={this.componentStyle}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control value={this.state.description}
                                  onChange={(event) => this.activitySelectDescription(event)} as="textarea" rows="3"/>
                </Form.Group>
            </div>
        )
    }

    activitySelectDescription(event) {
        this.setState({description: event.target.value});
    }

    generateCategories(categoriesData) {
        const {
            category
        } = this.state;

        let selectedCategory = null;

        if (category === "" || !category) {
            selectedCategory = "Izaberi kategoriju..."
        } else {
            categoriesData && categoriesData.forEach((categoryData) => {
                if (categoryData.get("id") === category) {
                    selectedCategory = categoryData.get("name");
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
                    onClick={() => this.activitySelectCategory(category)}>
                    {categoryName}
                </Dropdown.Item>);
            categoriesJsx.push(dataJsx);
        });

        return (
            <div style={this.commonMargin}>
                <Label>Kategorija</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedCategory}>
                    {categoriesJsx}
                </DropdownButton>
            </div>
        );
    }

    activitySelectCategory(selectCategory) {
        const {
            doFetchAllSubCategoriesByCategoryId
        } = this.props;
        const categoryId = selectCategory.get("id");
        this.setState({category: categoryId});
        this.setState({subCategory: ""});
        if (selectCategory) {
            doFetchAllSubCategoriesByCategoryId(categoryId, POPULATE_KEY_FETCH_SUBCATEGORIES, TYPE_FETCH_SUBCATEGORIES);
        }
    }

    generateSubCategories(subCategoriesData) {
        const {
            subcategory
        } = this.state;

        let selectedSubcategory = null;

        if (subcategory === "" || !subcategory) {
            selectedSubcategory = "Izaberi podkategoriju..."
        } else {
            subCategoriesData && subCategoriesData.forEach((subCategoryData) => {
                if (subCategoryData.get("id") === subcategory) {
                    selectedSubcategory = subCategoryData.get("name");
                }
            });
        }

        const subCategoriesJsx = [];
        subCategoriesData.forEach((subCategory) => {
            const subCategoryName = subCategory.get("name");
            const dataJsx = (
                <Dropdown.Item
                    key={"category-" + subCategory.get("id")}
                    style={this.dropDownItem}
                    onClick={() => this.activitySelectSubCategory(subCategory)}>
                    {subCategoryName}
                </Dropdown.Item>);
            subCategoriesJsx.push(dataJsx);
        });

        return (
            <div style={this.commonMargin}>
                <Label>Podkategorija</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedSubcategory}>
                    {subCategoriesJsx}
                </DropdownButton>
            </div>
        );
    }

    activitySelectSubCategory(subCategory) {
        const subCategoryId = subCategory.get("id");
        this.setState({subcategory: subCategoryId});
    }

    generateInvited() {
        const {
            invited
        } = this.state;

        let selectedInvited = null;

        if (invited === "" || !invited) {
            selectedInvited = "Pozvan..."
        } else {
            selectedInvited = invited;
        }

        return (
            <div style={this.commonMargin}>
                <Label>Invited</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedInvited}>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectInvited("false")}>Ne</Dropdown.Item>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectInvited("true")}>Da</Dropdown.Item>
                </DropdownButton>
            </div>
        );
    }

    activitySelectInvited(selectInvited) {
        this.setState({invited: selectInvited});
    }

    generateConfirmed() {
        const {
            confirmed
        } = this.state;

        let selectedConfirmed = null;

        if (confirmed === "" || !confirmed) {
            selectedConfirmed = "Potvrdio..."
        } else {
            selectedConfirmed = confirmed;
        }

        return (
            <div style={this.commonMargin}>
                <Label>Potvrdio</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedConfirmed}>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectConfirmed("true")}>Da</Dropdown.Item>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectConfirmed("false")}>Ne</Dropdown.Item>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectConfirmed("unknown")}>Nepoznato</Dropdown.Item>
                </DropdownButton>
            </div>
        );
    }

    activitySelectConfirmed(selectConfirmed) {
        this.setState({confirmed: selectConfirmed});
    }

    addCategoryPage() {
        const {
            history
        } = this.props;

        history.push("/addCategory");
    }

    addSubCategoryPage() {
        const {
            history
        } = this.props;

        history.push("/addSubCategory");
    }

    guestPage() {
        const {
            history
        } = this.props;

        history.push("/guests");
    }

    saveGuest() {
        const {
            firstName,
            lastName,
            description,
            category,
            subcategory,
            invited,
            confirmed,
        } = this.state;

        const {
            doPostGuest
        } = this.props;

      const userId = decrypt(window.sessionStorage.getItem("userId"));

      if (!firstName || firstName === "") {
            popUp("Greska", "Pogresno ime", null, true);
        } else if (!lastName || lastName === "") {
            popUp("Greska", "Pogresno prezime", null, true);
        } else if (!category || category === "") {
            popUp("Greska", "Pogresna kategorija", null, true);
        } else if (!subcategory || subcategory === "") {
            popUp("Greska", "Pogresna podkategorija", null, true);
        } else if (!invited || invited === "") {
            popUp("Greska", "Pogresan unos za pozvan", null, true);
        } else if (!confirmed || confirmed === "") {
            popUp("Greska", "pogresan unos za potvrdio", null, true);
        } else {
            doPostGuest(
                firstName, lastName, description,
                invited, confirmed, category, subcategory,
                userId, POPULATE_KEY_ADD_GUEST, TYPE_ADD_GUEST);
        }
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
                    <span style={this.span}/>
                    <Button onClick={() => this.addSubCategoryPage()}
                            style={this.buttonStyle}
                            variant="primary"
                            type="button">Dodaj podkategoriju</Button>
                </div>
            </div>
        )
    }

    render() {
        const {
            categories,
            subCategories
        } = this.props;

        //Setting up categories
        let categoriesJsx = null;
        if (categories && categories.size !== 0 && categories !== "error") {
            categoriesJsx = this.generateCategories(categories);
        } else if (categories && categories === "error") {
            this.addCategoryPage();
        }

        //Setting up subcategories
        let subCategoriesJsx = null;
        if (subCategories && subCategories.size !== 0 && subCategories !== "error") {
            subCategoriesJsx = this.generateSubCategories(subCategories);
        }

        const titleJsx = (
            <div style={this.title}>Dodaj gosta</div>
        );

        const saveJsx = (
            <div>
                <hr/>
                <Button onClick={() => this.saveGuest()}>Sacuvaj!</Button>
            </div>
        );


        return (
            <div style={this.panelStyle}>
                {this.generateButtonPanel()}
                <hr/>
                {titleJsx}
                {this.generateFirstName()}
                {this.generateLastName()}
                {this.generateDescription()}
                {categoriesJsx}
                {subCategoriesJsx}
                {this.generateInvited()}
                {this.generateConfirmed()}
                {saveJsx}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const categories = state.datareducer.get(POPULATE_KEY_FETCH_CATEGORIES);
    const subCategories = state.datareducer.get(POPULATE_KEY_FETCH_SUBCATEGORIES);
    const guestAdded = state.datareducer.get(POPULATE_KEY_ADD_GUEST);
    const userDetails = state.datareducer.get(POPULATE_KEY_USER_DETAILS);

  return {
        categories,
        subCategories,
        guestAdded,
        userDetails
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doFetchAllCategories,
        doFetchAllSubCategoriesByCategoryId,
        doPostGuest,
        updateResources
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGuest);