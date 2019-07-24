import React, {Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Label from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {doFetchAllCategories, doFetchAllSubCategoriesByCategoryId} from "../redux/actions/serverActions";
import {
    POPULATE_KEY_FETCH_CATEGORIES,
    POPULATE_KEY_FETCH_SUBCATEGORIES,
    TYPE_FETCH_CATEGORIES,
    TYPE_FETCH_SUBCATEGORIES
} from "../redux/actions/constants";
import {connect} from "react-redux";

class AddGuest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            description: "",
            category: "",
            subcategory: "",
            invited: "",
            confirmed: ""
        }
    }

    componentDidMount() {
        const {
            doFetchAllCategories
        } = this.props;

        doFetchAllCategories(POPULATE_KEY_FETCH_CATEGORIES, TYPE_FETCH_CATEGORIES)
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
                        <Label>Name</Label>
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
                        <Label>Last Name</Label>
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
                    <Form.Label>Description</Form.Label>
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
            selectedCategory = "Select Category..."
        } else {
            selectedCategory = category;
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
                <Label>Category</Label>
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
        const categoryName = selectCategory.get("name");
        this.setState({category: categoryName});
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
            selectedSubcategory = "Select SubCategory..."
        } else {
            selectedSubcategory = subcategory;
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
                <Label>SubCategory</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedSubcategory}>
                    {subCategoriesJsx}
                </DropdownButton>
            </div>
        );
    }

    activitySelectSubCategory(subCategory) {
        const subCategoryName = subCategory.get("name");
        this.setState({subcategory: subCategoryName});
    }

    generateInvited() {
        const {
            invited
        } = this.state;

        let selectedInvited = null;

        if (invited === "" || !invited) {
            selectedInvited = "Invited..."
        } else {
            selectedInvited = invited;
        }

        return (
            <div style={this.commonMargin}>
                <Label>Invited</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedInvited}>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectInvited("Yes")}>Yes</Dropdown.Item>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectInvited("No")}>No</Dropdown.Item>
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
            selectedConfirmed = "Confirmed..."
        } else {
            selectedConfirmed = confirmed;
        }

        return (
            <div style={this.commonMargin}>
                <Label>Confirmed</Label>
                <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedConfirmed}>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectConfirmed("Yes")}>Yes</Dropdown.Item>
                    <Dropdown.Item style={this.dropDownItem}
                                   onClick={() => this.activitySelectConfirmed("No")}>No</Dropdown.Item>
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

    render() {
        const {
            categories,
            subCategories
        } = this.props;

        const {
            subcategory
        } = this.state;

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
            <div style={this.title}>Add Guest</div>
        );

        const saveJsx = (
            <div>
                <hr/>
                <Button>Add Wedding Guest</Button>
            </div>
        );

        return (
            <div style={this.panelStyle}>
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

    return {
        categories,
        subCategories
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doFetchAllCategories,
        doFetchAllSubCategoriesByCategoryId
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGuest);