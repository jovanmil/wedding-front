import React, {Component} from "react";
import {doDeleteSingleGuest, doFetchAllGuests} from "../redux/actions/serverActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
  POPULATE_KEY_DELETE_GUEST,
  POPULATE_KEY_FETCH_GUESTS, POPULATE_KEY_USER_DETAILS,
  TYPE_DELETE_GUEST,
  TYPE_FETCH_GUESTS
} from "../redux/actions/constants";
import Table from "react-bootstrap/Table";
import editIcon from "../media/images/edit-icon.png";
import removeIcon from "../media/images/delete-icon.png";
import closeIcon from "../media/images/close-icon.png";
import {popUp} from "../utils/Util";
import Button from "react-bootstrap/Button";
import {decrypt} from "../redux/crypting/crypt";

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
            ]
        };
    }

    componentDidMount(){
      const {
        doFetchAllGuests
      } = this.props;

      const userId = decrypt(window.sessionStorage.getItem("userId"));

      doFetchAllGuests(userId, POPULATE_KEY_FETCH_GUESTS, TYPE_FETCH_GUESTS);
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

    handleEdit(id) {
        const {
            editActive
        } = this.state;

        this.setState({editActive: !editActive});
        this.setState({selectedId: id});
        this.generateContent();
    }

    handleReEdit(id) {
        this.setState({editActive: true});
        this.setState({selectedId: id});
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
                        <td style={this.td}>{guests.getIn([i, "firstName"])}</td>
                        <td style={this.td}>{guests.getIn([i, "lastName"])}</td>
                        <td style={this.td}>{guests.getIn([i, "category", "name"])}</td>
                        <td style={this.td}>{guests.getIn([i, "description"])}</td>
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

    generateButtonPanel() {
        return (
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

  return {
        guests,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doFetchAllGuests,
        doDeleteSingleGuest
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);