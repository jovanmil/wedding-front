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
        <div style={this.radioStyle}>
          <Label>Category</Label>
          <DropdownButton variant={"secondary"} id="dropdown-basic-button" title="Select Category...">
            <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>Category 1</Dropdown.Item>
            <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>Category 2</Dropdown.Item>
            <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>Category 3</Dropdown.Item>
          </DropdownButton>
        </div>
    );
  }

  generateSubCategories() {
    return (
        <div style={this.radioStyle}>
          <Label>SubCategory</Label>
          <DropdownButton variant={"secondary"} id="dropdown-basic-button" title="Select SubCategory...">
            <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>SubCategory 1</Dropdown.Item>
            <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>SubCategory 2</Dropdown.Item>
            <Dropdown.Item style={this.dropDownItem} onClick={() => alert("OK")}>SubCategory 3</Dropdown.Item>
          </DropdownButton>
        </div>
    );
  }

  generateInvited() {
    return (
        <div style={this.radioStyle}>
          <Label>Invited</Label>
          <div>
            <ButtonGroup toggle={true} aria-label="Basic example">
              <Button variant="secondary">Yes</Button>
              <Button variant="secondary">No</Button>
            </ButtonGroup>
          </div>
        </div>
    );
  }

  generateConfimed() {
    return (
        <div style={this.radioStyle}>
          <Label>Confirmed</Label>
          <div>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">Yes</Button>
              <Button variant="secondary">No</Button>
            </ButtonGroup>
          </div>
        </div>
    );
  }

  render() {

    const titleJsx = (
        <div style={this.title}>Add Guest</div>
    );

    const saveJsx = (
        <div style={this.saveButton}>
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