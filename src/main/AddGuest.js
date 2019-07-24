import React, {Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Label from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class AddGuest extends Component {
  constructor(props) {
    super(props);
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

  saveButton = {
    marginTop: "30px",
  };

  radioStyle = {
    marginTop: "20px",
    display: "block"
  };

  dropDownButton = {
    display: "block",
    marginTop: "20px"
  };

  dropDownItem = {
    display: "block",
    marginLeft: "10px",
    fontSize: "16px",
    color: "grey"
  };

  generateFirstName() {
    return (
        <div style={this.componentStyle}>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <Label>Name</Label>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
          </InputGroup>
        </div>
    )
  }

  generateLastName() {
    return (
        <div style={this.componentStyle}>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <Label>Last Name</Label>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
          </InputGroup>
        </div>
    )
  }

  generateDescription() {
    return (
        <div style={this.componentStyle}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3"/>
          </Form.Group>
        </div>
    )
  }

  generateCategories() {
    return (
        <DropdownButton style={this.dropDownButton} variant={"secondary"} id="dropdown-basic-button" title="Select Category">
          <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>Category 1</Dropdown.Item>
          <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>Category 2</Dropdown.Item>
          <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>Category 3</Dropdown.Item>
        </DropdownButton>
    );
  }

  generateSubCategories() {
    return (
        <DropdownButton style={this.dropDownButton} variant={"secondary"} id="dropdown-basic-button" title="Select SubCategory">
          <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>SubCategory 1</Dropdown.Item>
          <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>SubCategory 2</Dropdown.Item>
          <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>SubCategory 3</Dropdown.Item>
        </DropdownButton>
    );
  }

  generateInvited() {
    return (
        <div style={this.radioStyle}>
          <Label>Invited</Label>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">Yes</Button>
            <Button variant="secondary">No</Button>
          </ButtonGroup>
        </div>
    );
  }

  generateConfimed() {
    return (
        <div style={this.radioStyle}>
          <Label>Confirmed</Label>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">Yes</Button>
            <Button variant="secondary">No</Button>
          </ButtonGroup>
        </div>
    );
  }

  render() {

    const titleJsx = (
        <div style={this.title}>Add Guest</div>
    );

    const saveJsx = (
        <div style={this.saveButton}>
          <Button>Save</Button>
        </div>
    );

    return (
        <div style={this.panelStyle}>
          {titleJsx}
          {this.generateFirstName()}
          {this.generateLastName()}
          {this.generateDescription()}
          {this.generateCategories()}
          {this.generateSubCategories()}
          {this.generateInvited()}
          {this.generateConfimed()}
          {saveJsx}
        </div>

    )
  }
}

export default AddGuest;