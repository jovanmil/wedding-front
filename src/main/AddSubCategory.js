import React, {Component} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Label from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class AddSubCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: ""
        }
    }

    componentStyle = {
        marginTop: "10px",
    };

    title = {
        fontSize: "22px"
    };

    panelStyle = {
        marginTop: "20px",
        marginBottom: "20px",
    };

    generateCategory() {
        return (
            <div style={this.componentStyle}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <Label>Category</Label>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.category} onChange={(event) => this.activitySelectCategory(event)}
                                 aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </InputGroup>
            </div>
        )
    }

    activitySelectCategory(event) {
        this.setState({category: event.target.value});
    }

  render() {
      const titleJsx = (
          <div style={this.title}>Add Category</div>
      );

      const saveJsx = (
          <div>
              <hr/>
              <Button onClick={() => this.saveGuest()}>Add Category</Button>
          </div>
      );

    return (
        <div style={this.panelStyle}>
            {titleJsx}
            {this.generateCategory()}
            {saveJsx}
        </div>

    )
  }
}

export default AddSubCategory;