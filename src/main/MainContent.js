import React, {Component} from "react";
import {doDeleteSingleGuest, doFetchAllGuests, doLogin, doUpdateGuest} from "../redux/actions/serverActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    POPULATE_KEY_DELETE_GUEST,
    POPULATE_KEY_FETCH_GUESTS,
    POPULATE_KEY_LOG_IN,
    POPULATE_KEY_UPDATE_GUEST,
    TYPE_DELETE_GUEST,
    TYPE_FETCH_GUESTS,
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

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editActive: false,
            selectedId: null,
            headers: [
                "Sort No.",
                "First Name",
                "Last Name",
                "Category",
                "Description",
                "Invited",
                "Confirmed",
                "Edit"
            ],
            firstName: "",
            lastName: "",
            description: "",
            category: "",
            subcategory: "",
            invited: "false",
            confirmed: "unknown"
        };
    }

    componentDidMount(){
      const {
        doFetchAllGuests
      } = this.props;

      const userId = decrypt(window.sessionStorage.getItem("userId"));
        const authToken = decrypt(window.sessionStorage.getItem("token"));

        if (!authToken) {
            this.logoutUser();
        } else {
            doFetchAllGuests(userId, POPULATE_KEY_FETCH_GUESTS, TYPE_FETCH_GUESTS);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            guestUpdate,
            doFetchAllGuests
        } = this.props;

        const {
            guestUpdate: nextGuestUpdate
        } = nextProps;

        const userId = decrypt(window.sessionStorage.getItem("userId"));

        if (nextGuestUpdate && guestUpdate !== nextGuestUpdate) {
            doFetchAllGuests(userId, POPULATE_KEY_FETCH_GUESTS, TYPE_FETCH_GUESTS);
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

    span = {
        marginLeft: "5px",
        marginRight: "5px"
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
            headers.splice(7, 0, "Remove");
        } else {
            headers.splice(8, 9);
            headers[7] = "Edit";
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

    resetInputTextOnHanldeEdit() {
        this.setState({firstName: ""});
        this.setState({lastName: ""});
        this.setState({description: ""});
    }

    handleEdit(id) {
        const {
            editActive
        } = this.state;

        this.setState({editActive: !editActive});
        this.setState({selectedId: id});
        this.resetInputTextOnHanldeEdit();
        this.generateContent();
        this.saveGuestChanges(id);
    }

    saveGuestChanges(id) {
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
            doUpdateGuest
        } = this.props;

        doUpdateGuest(
            id,
            firstName,
            lastName,
            description,
            invited,
            confirmed,
            category,
            subcategory,
            POPULATE_KEY_UPDATE_GUEST,
            TYPE_UPDATE_GUEST
        );
    }

    handleReEdit(id) {
        this.setState({editActive: true});
        this.setState({selectedId: id});
        this.resetInputTextOnHanldeEdit();
        this.generateContent();
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
                "Delete guest",
                "Are you sure you want to do this?",
                () => this.permanentlyRemoveGuest(guestId)
            );
        }
    }

    inputStyle = {
        margin: "0px",
        border: "0px",
        width: "150px"
    };

    generateEditFirstName(firstNameEdit) {
        return (
            <td>
                <InputGroup>
                    <FormControl style={this.inputStyle} value={this.state.firstName || firstNameEdit}
                                 onChange={(event) => this.activitySelectFirstName(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </td>
        )
    }

    activitySelectFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    generateEditLastName(lastNameEdit) {
        return (
            <td>
                <InputGroup>
                    <FormControl style={this.inputStyle} value={this.state.lastName || lastNameEdit}
                                 onChange={(event) => this.activitySelectLastName(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </td>
        )
    }

    activitySelectLastName(event) {
        this.setState({lastName: event.target.value});
    }

    generateEditDescription(descriptionEdit) {
        return (
            <td>
                <InputGroup>
                    <FormControl style={this.inputStyle} value={this.state.description || descriptionEdit}
                                 onChange={(event) => this.activitySelectDescription(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </td>
        )
    }

    activitySelectDescription(event) {
        this.setState({description: event.target.value});
    }


    generateContent() {
        const {
            editActive,
            selectedId
        } = this.state;

        const {
            guests
        } = this.props;

        const bodyContent = [];

        if (guests && guests.length !== 0) {
            for (let i = 0; i < guests.size; i++) {
                bodyContent.push(
                    <tr key={"content-" + i}>
                        <td style={this.td}>{guests.getIn([i, "id"])}</td>
                        {editActive && (guests.getIn([i, "id"]) === selectedId) ? (
                            this.generateEditFirstName(guests.getIn([i, "firstName"]))
                        ) : (
                            <td style={this.td}>{guests.getIn([i, "firstName"])}</td>
                        )}
                        {editActive && (guests.getIn([i, "id"]) === selectedId) ? (
                            this.generateEditLastName(guests.getIn([i, "lastName"]))
                        ) : (
                            <td style={this.td}>{guests.getIn([i, "lastName"])}</td>
                        )}
                        <td style={this.td}>{guests.getIn([i, "category", "name"])}</td>
                        {editActive && (guests.getIn([i, "id"]) === selectedId) ? (
                            this.generateEditDescription(guests.getIn([i, "description"]))
                        ) : (
                            <td style={this.td}>{guests.getIn([i, "description"])}</td>
                        )}
                        <td style={this.td}>{guests.getIn([i, "invited"])}</td>
                        <td style={this.td}>{guests.getIn([i, "confirmed"])}</td>
                        {editActive && (guests.getIn([i, "id"]) === selectedId) ? (
                            <td key={"content-removeIcon"} style={this.td}>
                                <img alt={"remove-icon"}
                                     style={this.logoStyle}
                                     src={removeIcon}
                                     onClick={() => this.handleRemove(guests.getIn([i, "id"]))}
                                />
                            </td>
                        ) : null}

                        {
                            editActive && (guests.getIn([i, "id"]) === selectedId) ? (
                                <td style={this.td}>
                                    <img alt={"close-icon"} style={this.logoStyle} src={closeIcon}
                                         onClick={() => this.handleEdit(guests.getIn([i, "id"]))}/>
                                </td>
                            ) : (
                                <td style={this.td}>
                                    <img alt={"edit-icon"} style={this.logoStyle} src={editIcon}
                                         onClick={() => this.handleReEdit(guests.getIn([i, "id"]))}/>
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
        const userEmail = "(" + decrypt(window.sessionStorage.getItem("userEmail")) + ")";

        return (
            <div style={this.wrapper}>
                <div style={this.logout} onClick={() => this.logoutUser()}>{userEmail + " Logout"}</div>
                <div style={this.buttonPanel}>
                    <Button onClick={() => this.addGuestPage()}
                            style={this.buttonStyle}
                            variant="primary"
                            type="button">Add Guest</Button>
                    <span style={this.span}/>
                    <Button onClick={() => this.addCategoryPage()}
                            style={this.buttonStyle}
                            variant="primary"
                            type="button">Add Category</Button>
                    <span style={this.span}/>
                    <Button onClick={() => this.addSubCategoryPage()}
                            style={this.buttonStyle}
                            variant="primary"
                            type="button">Add SubCategory</Button>
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
    const guests = state.datareducer.get(POPULATE_KEY_FETCH_GUESTS);
    const guestUpdate = state.datareducer.get(POPULATE_KEY_UPDATE_GUEST);

    return {
        guests,
        guestUpdate
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doLogin,
        doFetchAllGuests,
        doDeleteSingleGuest,
        updateResources,
        doUpdateGuest
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);