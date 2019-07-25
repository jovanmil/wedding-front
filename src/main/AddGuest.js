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
  TYPE_ADD_GUEST,
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
      invited: "false",
      confirmed: "unknown"
    }
  }

  componentDidMount() {
    const {
      doFetchAllCategories
    } = this.props;

    doFetchAllCategories(POPULATE_KEY_FETCH_CATEGORIES, TYPE_FETCH_CATEGORIES)
  }

  componentWillUnmount() {
    const {
      updateResources
    } = this.props;

    const result = {
      data: ""
    };

    updateResources(result, POPULATE_KEY_FETCH_SUBCATEGORIES, TYPE_FETCH_SUBCATEGORIES)
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
    }
    else {
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
      selectedSubcategory = "Select SubCategory..."
    }
    else {
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
          <Label>SubCategory</Label>
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
      selectedInvited = "Invited..."
    }
    else {
      selectedInvited = invited;
    }

    return (
        <div style={this.commonMargin}>
          <Label>Invited</Label>
          <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedInvited}>
            <Dropdown.Item style={this.dropDownItem}
                           onClick={() => this.activitySelectInvited("false")}>false</Dropdown.Item>
            <Dropdown.Item style={this.dropDownItem}
                           onClick={() => this.activitySelectInvited("true")}>true</Dropdown.Item>
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
    }
    else {
      selectedConfirmed = confirmed;
    }

    return (
        <div style={this.commonMargin}>
          <Label>Confirmed</Label>
          <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedConfirmed}>
            <Dropdown.Item style={this.dropDownItem}
                           onClick={() => this.activitySelectConfirmed("true")}>true</Dropdown.Item>
            <Dropdown.Item style={this.dropDownItem}
                           onClick={() => this.activitySelectConfirmed("false")}>false</Dropdown.Item>
            <Dropdown.Item style={this.dropDownItem}
                           onClick={() => this.activitySelectConfirmed("unknown")}>unknown</Dropdown.Item>
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
      confirmed
    } = this.state;

    const {
      doPostGuest
    } = this.props;

    if (!firstName || firstName === "") {
      popUp("Error", "Wrong first name", null, true);
    }
    else if (!lastName || lastName === "") {
      popUp("Error", "Wrong last name", null, true);
    }
    else if (!category || category === "") {
      popUp("Error", "Wrong category", null, true);
    }
    else if (!subcategory || subcategory === "") {
      popUp("Error", "Wrong subcategory", null, true);
    }
    else if (!invited || invited === "") {
      popUp("Error", "Wrong invited", null, true);
    }
    else if (!confirmed || confirmed === "") {
      popUp("Error", "Wrong confirmed", null, true);
    }
    else {
      doPostGuest(firstName, lastName, description, invited, confirmed, category, subcategory, "1", POPULATE_KEY_ADD_GUEST, TYPE_ADD_GUEST);
    }
  }

  render() {
    const {
      categories,
      subCategories,
      guestAdded
    } = this.props;

    if (guestAdded) {
      this.guestPage();
    }

    //Setting up categories
    let categoriesJsx = null;
    if (categories && categories.size !== 0 && categories !== "error") {
      categoriesJsx = this.generateCategories(categories);
    }
    else if (categories && categories === "error") {
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
          <Button onClick={() => this.saveGuest()}>Add Wedding Guest</Button>
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
  const guestAdded = state.datareducer.get(POPULATE_KEY_ADD_GUEST);

  return {
    categories,
    subCategories,
    guestAdded
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