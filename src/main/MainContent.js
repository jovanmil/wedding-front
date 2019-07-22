import React, {Component} from "react";
import {doLogin} from "../redux/actions/loginActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {POPULATE_KEY_LOG_IN} from "../redux/actions/constants";
import Table from "react-bootstrap/Table"

class MainContent extends Component {

  generateHeader() {

  }

  generateContent() {

  }

  render() {

    const tableJsx = (
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
          </tbody>
        </Table>
    );

    return (
        tableJsx
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);