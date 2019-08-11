import React, {Component} from "react";
import {
    doDeleteSingleGuest,
    doFetchAllCategories,
    doFetchAllGuests,
    doFetchAllSubCategoriesByCategoryId,
    doLogin,
    doUpdateGuest
} from "../redux/actions/serverActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    POPULATE_KEY_DELETE_GUEST,
    POPULATE_KEY_FETCH_CATEGORIES,
    POPULATE_KEY_FETCH_GUESTS,
    POPULATE_KEY_FETCH_SUBCATEGORIES,
    POPULATE_KEY_LOG_IN,
    POPULATE_KEY_UPDATE_GUEST,
    TYPE_DELETE_GUEST,
    TYPE_FETCH_CATEGORIES,
    TYPE_FETCH_GUESTS,
    TYPE_FETCH_SUBCATEGORIES,
    TYPE_LOG_IN,
    TYPE_UPDATE_GUEST
} from "../redux/actions/constants";
import {updateResources} from "../redux/actions/populateActions";
import Table from "react-bootstrap/Table";
import editIcon from "../media/images/edit-icon.png";
import removeIcon from "../media/images/delete-icon.png";
import closeIcon from "../media/images/close-icon.png";
import {popUp} from "../utils/Util";
import Button from "react-bootstrap/Button";
import {decrypt} from "../redux/crypting/crypt";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editActive: false,
      selectedId: null,
      headers: [
        "ID",
        "Ime",
        "Prezime",
        "Kategorija",
        "Podkategorija",
        "Opis",
        "Broj stola",
        "Pozvan",
        "Potvrdio",
        "Edit",
      ],
      firstName: "",
      lastName: "",
      description: "",
      tableNo: "",
      category: "",
      subcategory: "",
      invited: "false",
      confirmed: "unknown"
    };
  }

  componentDidMount() {
    const {
      doFetchAllGuests,
      doFetchAllCategories
    } = this.props;

    const userId = decrypt(window.sessionStorage.getItem("userId"));
    const authToken = decrypt(window.sessionStorage.getItem("token"));

    if (!authToken) {
      this.logoutUser();
    }
    else {
      doFetchAllGuests(userId, POPULATE_KEY_FETCH_GUESTS, TYPE_FETCH_GUESTS);
      doFetchAllCategories(userId, POPULATE_KEY_FETCH_CATEGORIES, TYPE_FETCH_CATEGORIES);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      guestUpdate,
      doFetchAllGuests,
      doFetchAllCategories,
    } = this.props;

    const {
      guestUpdate: nextGuestUpdate,
    } = nextProps;

    const userId = decrypt(window.sessionStorage.getItem("userId"));

    if (nextGuestUpdate && guestUpdate !== nextGuestUpdate) {
      doFetchAllGuests(userId, POPULATE_KEY_FETCH_GUESTS, TYPE_FETCH_GUESTS);
      doFetchAllCategories(userId, POPULATE_KEY_FETCH_CATEGORIES, TYPE_FETCH_CATEGORIES);
    }
  }

  tableStyle = {
    marginTop: "20px",
    marginBottom: "30px",
  };

  td = {
    textAlign: "center"
  };

  th = {
    textAlign: "center"
  };

  boldText = {
    fontWeight: "bold"
  };

  redAlert = {
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  };

  greenAlert = {
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  };

  yellowAlert = {
    backgroundColor: "yellow",
    textAlign: "center",
    fontWeight: "bold"
  };

  span = {
    marginLeft: "5px",
    marginRight: "5px"
  };

  commonMargin = {
    display: "block"
  };

  dropDownItem = {
    display: "block",
    marginLeft: "10px",
    fontSize: "14px",
    color: "#303030"
  };

  buttonPanel = {
    marginTop: "20px",
    textAlign: "left"
  };

  logoStyle = {
    width: "20px",
    cursor: "pointer"
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

  generateHeader() {
    const {
      headers,
      editActive,
      selectedId
    } = this.state;

    if (editActive && !selectedId) {
      headers.splice(9, 0, "Remove");
    }
    else {
      headers.splice(10, 11);
      headers[9] = "Edit";
    }

    const headersJsx = [];
    for (let i = 0; i < headers.length; i++) {
      headersJsx.push(
          <th key={"header-" + i} style={this.th}>{headers[i]}</th>
      );
    }

    return (
        <thead>
        <tr>
          {headersJsx}
        </tr>
        </thead>
    );
  }

  resetInputTextOnHanldeEdit(id, list, position) {
      this.setState({firstName: list[position].get("firstName")});
      this.setState({lastName: list[position].get("lastName")});
      this.setState({description: list[position].get("description")});
      this.setState({tableNo: list[position].get("tableNo")});
      this.setState({invited: list[position].get("invited")});
      this.setState({confirmed: list[position].get("confirmed")});
  }

  handleEdit(id, list, position) {
    const {
      editActive
    } = this.state;

    this.setState({editActive: !editActive});
    this.setState({selectedId: id});
    this.generateContent();

    this.saveGuestChanges(id, list, position);
  }

  handleReEdit(id, list, position) {
    this.setState({editActive: true});
    this.setState({selectedId: id});
    this.resetInputTextOnHanldeEdit(id, list, position);
    this.generateContent();
  }

  saveGuestChanges(id, list, position) {
    const {
      firstName,
      lastName,
      description,
      category,
      subcategory,
      invited,
      confirmed,
      tableNo
    } = this.state;

    let firstNameFinal = null;
    if (firstName === "") {
      firstNameFinal = list.getIn([position, "firstName"]);
    }
    else {
      firstNameFinal = firstName;
    }

    let lastNameFinal = null;
    if (lastName === "") {
      lastNameFinal = list.getIn([position, "lastName"]);
    }
    else {
      lastNameFinal = lastName;
    }

    let categoryFinal = null;
    if (category === "") {
        categoryFinal = list[position].getIn(["category", "id"]);
    }
    else {
      categoryFinal = category;
    }

    let subCategoryFinal = null;
    if (subcategory === "") {
        subCategoryFinal = list[position].getIn(["subcategory", "id"]);
    }
    else {
      subCategoryFinal = subcategory;
    }

    const {
      doUpdateGuest
    } = this.props;

    doUpdateGuest(
        id,
        firstNameFinal,
        lastNameFinal,
        description,
        invited,
        confirmed,
        categoryFinal,
        subCategoryFinal,
        tableNo,
        POPULATE_KEY_UPDATE_GUEST,
        TYPE_UPDATE_GUEST
    );
  }

  addGuestPage() {
    const {
      history
    } = this.props;

    history.push("/addGuest");
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

  permanentlyRemoveGuest(guestId) {
    const {
      guests,
      doDeleteSingleGuest
    } = this.props;

    const {
      editActive
    } = this.state;

    doDeleteSingleGuest(guestId, POPULATE_KEY_DELETE_GUEST, TYPE_DELETE_GUEST)
    const removedGuestItems = guests.filter(x => x.id !== guestId);
    this.setState({editActive: !editActive});
    this.setState({guests: removedGuestItems});
  }

  handleRemove(guestId) {
    if (guestId) {
      popUp(
          "Obrisi Gosta",
          "Da li ste sigurno da zelite da obrisete gosta?",
          () => this.permanentlyRemoveGuest(guestId)
      );
    }
  }

  inputStyle = {
    margin: "0px",
    border: "0px",
    width: "150px"
  };

  generateEditFirstName() {
    return (
        <td>
          <InputGroup>
            <FormControl style={this.inputStyle} value={this.state.firstName}
                         onChange={(event) => this.activitySelectFirstName(event)}
                         aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
        </td>
    )
  }

  activitySelectFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  generateEditLastName() {
    return (
        <td>
          <InputGroup>
            <FormControl style={this.inputStyle} value={this.state.lastName}
                         onChange={(event) => this.activitySelectLastName(event)}
                         aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
          </InputGroup>
        </td>
    )
  }

  activitySelectLastName(event) {
    this.setState({lastName: event.target.value});
  }

  generateEditDescription() {
    return (
        <td>
          <InputGroup>
            <FormControl style={this.inputStyle} value={this.state.description}
                         onChange={(event) => this.activitySelectDescription(event)}
                         aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
          </InputGroup>
        </td>
    )
  }

  activitySelectDescription(event) {
    this.setState({description: event.target.value});
  }

  generateEditTableNumber() {
    return (
        <td>
          <InputGroup>
            <FormControl style={this.inputStyle} value={this.state.tableNo}
                         onChange={(event) => this.activitySelectTableNumber(event)}
                         aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
          </InputGroup>
        </td>
    )
  }

  activitySelectTableNumber(event) {
    this.setState({tableNo: event.target.value});
  }

  generateInvited(invitedEdit) {
    return (
        <td>
          <div style={this.commonMargin}>
            <DropdownButton variant={"secondary"} id="dropdown-basic-button"
                            title={this.state.invited || invitedEdit}>
              <Dropdown.Item style={this.dropDownItem}
                             onClick={() => this.activitySelectInvited("false")}>false</Dropdown.Item>
              <Dropdown.Item style={this.dropDownItem}
                             onClick={() => this.activitySelectInvited("true")}>true</Dropdown.Item>
            </DropdownButton>
          </div>
        </td>
    );
  }

  activitySelectInvited(selectInvited) {
    this.setState({invited: selectInvited});
  }

  generateConfirmed(confirmedEdit) {
    return (
        <td>
          <div style={this.commonMargin}>
            <DropdownButton variant={"secondary"} id="dropdown-basic-button"
                            title={this.state.confirmed || confirmedEdit}>
              <Dropdown.Item style={this.dropDownItem}
                             onClick={() => this.activitySelectConfirmed("true")}>true</Dropdown.Item>
              <Dropdown.Item style={this.dropDownItem}
                             onClick={() => this.activitySelectConfirmed("false")}>false</Dropdown.Item>
              <Dropdown.Item style={this.dropDownItem}
                             onClick={() => this.activitySelectConfirmed("unknown")}>unknown</Dropdown.Item>
            </DropdownButton>
          </div>
        </td>
    );
  }

  activitySelectConfirmed(selectConfirmed) {
    this.setState({confirmed: selectConfirmed});
  }

  generateCategories(categoryEdit, list) {
    const {
      category
    } = this.state;

    let selectedCategory = null;

    if (category === "" || !category) {
      selectedCategory = categoryEdit.get("name");
    }
    else {
      list && list.forEach((categoryData) => {
        if (categoryData.get("id") === category) {
          selectedCategory = categoryData.get("name");
        }
      });
    }

    const categoriesJsx = [];
    list.forEach((category) => {
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
        <td>
          <div style={this.commonMargin}>
            <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedCategory}>
              {categoriesJsx}
            </DropdownButton>
          </div>
        </td>
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

  generateSubCategory(subCategoryEdit, list) {
    const {
      subcategory,
    } = this.state;

    let selectedSubcategory = null;

    if (subcategory === "" || !subcategory) {
      selectedSubcategory = subCategoryEdit.get("name");
    }
    else {
      list && list.forEach((subCategoryData) => {
        if (subCategoryData.get("id") === subcategory) {
          selectedSubcategory = subCategoryData.get("name");
        }
      });
    }

    const subCategoriesJsx = [];
    list && list.forEach((subCategory) => {
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
        <td>
          <div style={this.commonMargin}>
            <DropdownButton variant={"secondary"} id="dropdown-basic-button" title={selectedSubcategory}>
              {subCategoriesJsx}
            </DropdownButton>
          </div>
        </td>
    );
  }

  activitySelectSubCategory(subCategory) {
    const subCategoryId = subCategory.get("id");
    this.setState({subcategory: subCategoryId});
  }

  generateContent() {
    const {
      editActive,
      selectedId
    } = this.state;

    const {
      guests,
      categories,
      subCategories
    } = this.props;

    const bodyContent = [];
      const guestArr = [];
      if (guests && guests.size !== 0) {
          guests.forEach((guest) => {
              guestArr.push(guest);
          });

          guestArr.sort((a, b) => {
              return (a.get("category").get("name") > b.get("category").get("name")) ? 1 : -1
          });
      }

      if (guestArr && guestArr.length !== 0 && categories) {
          for (let i = 0; i < guestArr.length; i++) {
        bodyContent.push(
            <tr key={"content-" + i}>
                <td style={this.td}>{guestArr[i].get("id")}</td>
                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateEditFirstName(guestArr[i].get("firstName"))
              ) : (
                    <td style={this.td}>{guestArr[i].get("firstName")}</td>
              )}
                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateEditLastName(guestArr[i].get("lastName"))
              ) : (
                    <td style={this.td}>{guestArr[i].get("lastName")}</td>
              )}

                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateCategories(guestArr[i].get("category"), categories)
              ) : (
                    <td style={this.td}>{guestArr[i].get("category").get("name")}</td>
              )}

                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateSubCategory(guestArr[i].get("subcategory"), subCategories)
              ) : (
                    <td style={this.td}>{guestArr[i].get("subcategory").get("name")}</td>
              )}

                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateEditDescription(guestArr[i].get("description"))
              ) : (
                    <td style={this.td}>{guestArr[i].get("description")}</td>
              )}

                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateEditTableNumber(guestArr[i].get("tableNo"))
              ) : (
                    <td style={this.td}>{guestArr[i].get("tableNo")}</td>
              )}

                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateInvited(guestArr[i].get("invited"))
              ) : (
                    guestArr[i].get("invited") === "true" ?
                        <td style={this.greenAlert}>{guestArr[i].get("invited")}</td> :
                        <td style={this.yellowAlert}>{guestArr[i].get("invited")}</td>
              )}

                {editActive && (guestArr[i].get("id") === selectedId) ? (
                    this.generateConfirmed(guestArr[i].get("confirmed"))
              ) : (
                    guestArr[i].get("confirmed") === "true" ?
                        <td style={this.greenAlert}>{guestArr[i].get("confirmed")}</td> : (
                            guestArr[i].get("confirmed") === "false" ?
                                <td style={this.redAlert}>{guestArr[i].get("confirmed")}</td> :
                                <td style={this.td}>{guestArr[i].get("confirmed")}</td>
                      )
              )}

                {editActive && (guestArr[i].get("id") === selectedId) ? (
                  <td key={"content-removeIcon"} style={this.td}>
                    <img alt={"remove-icon"}
                         style={this.logoStyle}
                         src={removeIcon}
                         onClick={() => this.handleRemove(guestArr[i].get("id"))}
                    />
                  </td>
              ) : null}

              {
                  editActive && (guestArr[i].get("id") === selectedId) ? (
                    <td style={this.td}>
                      <img alt={"close-icon"} style={this.logoStyle} src={closeIcon}
                           onClick={() => this.handleEdit(guestArr[i].get("id"), guestArr, i)}/>
                    </td>
                ) : (
                    <td style={this.td}>
                      <img alt={"edit-icon"} style={this.logoStyle} src={editIcon}
                           onClick={() => this.handleReEdit(guestArr[i].get("id"), guestArr, i)}/>
                    </td>
                )
              }
            </tr>
        );
      }
    }

    return (
        <tbody>
        {bodyContent}
        </tbody>
    );
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
    const {
      totalCount,
      jovanCount,
      danicaCount,
      confirmedCount,
    } = this.props;

    const userEmail = "(" + decrypt(window.sessionStorage.getItem("userEmail")) + ")";

    return (
        <div style={this.wrapper}>
          <div style={this.logout} onClick={() => this.logoutUser()}>{userEmail + " Logout"}</div>
          <div style={this.buttonPanel}>
            <Button onClick={() => this.addGuestPage()}
                    style={this.buttonStyle}
                    variant="primary"
                    type="button">Dodaj gosta</Button>
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
            <span style={this.span}/>
            <Button style={this.boldText}>{"T : " + totalCount}</Button>
            <span style={this.span}/>
            <Button style={this.boldText}>{"J : " + jovanCount}</Button>
            <span style={this.span}/>
            <Button style={this.boldText}>{"D : " + danicaCount + " "}</Button>
            <span style={this.span}/>
            <Button style={this.boldText}>{"C : " + confirmedCount}</Button>
          </div>
        </div>

    )
  }

  render() {
    const tableJsx = (
        <div>
          {this.generateButtonPanel()}
          <Table style={this.tableStyle} striped bordered hover>
            {this.generateHeader()}
            {this.generateContent()}
          </Table>
        </div>
    );

    return (
        tableJsx
    )
  }
}

const mapStateToProps = state => {
  const guests = state.datareducer.getIn([POPULATE_KEY_FETCH_GUESTS, "guestData"]);
  const totalCount = state.datareducer.getIn([POPULATE_KEY_FETCH_GUESTS, "allGuests"]);
  const jovanCount = state.datareducer.getIn([POPULATE_KEY_FETCH_GUESTS, "jovanGuests"]);
  const danicaCount = state.datareducer.getIn([POPULATE_KEY_FETCH_GUESTS, "danicaGuests"]);
  const confirmedCount = state.datareducer.getIn([POPULATE_KEY_FETCH_GUESTS, "confirmedGuests"]);
  const categories = state.datareducer.get(POPULATE_KEY_FETCH_CATEGORIES);
  const guestUpdate = state.datareducer.get(POPULATE_KEY_UPDATE_GUEST);
  const subCategories = state.datareducer.get(POPULATE_KEY_FETCH_SUBCATEGORIES);

  return {
    guests,
    guestUpdate,
    categories,
    subCategories,
    totalCount,
    danicaCount,
    jovanCount,
    confirmedCount
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doLogin,
    doFetchAllGuests,
    doDeleteSingleGuest,
    updateResources,
    doUpdateGuest,
    doFetchAllCategories,
    doFetchAllSubCategoriesByCategoryId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);