import React, {Component} from "react";
import {doFetchAllGuests, doLogin} from "../redux/actions/serverActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {POPULATE_KEY_FETCH_GUESTS, TYPE_FETCH_GUESTS} from "../redux/actions/constants";
import Table from "react-bootstrap/Table";
import editIcon from "../media/images/edit-icon.png";
import removeIcon from "../media/images/delete-icon.png";
import closeIcon from "../media/images/close-icon.png";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editActive: false,
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
      guests: [
        {
          id: 1,
          sortNo: 1,
          firstName: "Jovan",
          lastName: "Mil",
          category: "Tatini prijatelji",
          description: "Description 1",
          invited: "yes",
          confirmed: "no"
        },
        {
          id: 2,
          sortNo: 2,
          firstName: "Milica",
          lastName: "Mil",
          category: "Familija",
          description: "Description 2",
          invited: "no",
          confirmed: "no"
        }
      ]

    };
  }

  componentDidMount() {
    const {
      doFetchAllGuests
    } = this.props;

    doFetchAllGuests(POPULATE_KEY_FETCH_GUESTS, TYPE_FETCH_GUESTS)
  }


  tableStyle = {
    marginTop: "30px",
    marginBottom: "30px",
  };

  td = {
    textAlign: "center"
  };

  th = {
    textAlign: "center"
  };

  logoStyle = {
    width: "20px",
    cursor: "pointer"
  };

  generateHeader() {
    const {
      headers,
      editActive
    } = this.state;

    if (editActive) {
      headers.splice(7, 0, "Remove");
    }
    else {
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

    this.generateContent(id);
  }

  handleRemove(guestId) {
    const{
      guests,
      editActive
    } = this.state;

    const removedGuestItems = guests.filter(x => x.id !== guestId);
    this.setState({editActive: !editActive});
    this.setState({guests: removedGuestItems});
  }

  generateContent(id) {
    const {
      guests,
      editActive
    } = this.state;

    const bodyContent = [];

    let editGuestJsx = null;
    if (editActive) {
      editGuestJsx = (
          <img alt={"close-icon"} style={this.logoStyle} src={closeIcon} onClick={(id) => this.handleEdit(id)}/>
      );
    }
    else {
      editGuestJsx = (
          <img alt={"edit-icon"} style={this.logoStyle} src={editIcon} onClick={(id) => this.handleEdit(id)}/>
      );
    }

    for (let i = 0; i < guests.length; i++) {
      bodyContent.push(
          <tr key={"content-" + i}>
            <td style={this.td}>{guests[i].sortNo}</td>
            <td style={this.td}>{guests[i].firstName}</td>
            <td style={this.td}>{guests[i].lastName}</td>
            <td style={this.td}>{guests[i].category}</td>
            <td style={this.td}>{guests[i].description}</td>
            <td style={this.td}>{guests[i].invited}</td>
            <td style={this.td}>{guests[i].confirmed}</td>
            {editActive ? (
                <td key={"content-removeIcon"} style={this.td}>
                  <img alt={"remove-icon"}
                       style={this.logoStyle}
                       src={removeIcon}
                       onClick={() => this.handleRemove(guests[i].id)}
                  />
                </td>
            ) : null}
            <td style={this.td}>{editGuestJsx}</td>
          </tr>
      );
    }

    return (
        <tbody>
        {bodyContent}
        </tbody>
    );
  }

  render() {
    const tableJsx = (
        <Table style={this.tableStyle} striped bordered hover>
          {this.generateHeader()}
          {this.generateContent()}
        </Table>
    );

    return (
        tableJsx
    )
  }
}

const mapStateToProps = state => {
  const guests = state.datareducer.get(POPULATE_KEY_FETCH_GUESTS);

  return {
    guests
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doLogin,
    doFetchAllGuests
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);