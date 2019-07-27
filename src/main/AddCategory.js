import React, {Component} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Label from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {doPostCategory} from "../redux/actions/serverActions";
import {POPULATE_KEY_ADD_CATEGORY, TYPE_ADD_CATEGORY,} from "../redux/actions/constants";
import {updateResources} from "../redux/actions/populateActions";
import {connect} from "react-redux";
import {popUp} from "../utils/Util";


class AddCategory extends Component {
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

    buttonPanel = {
        marginTop: "20px",
        textAlign: "left",
        marginBottom: "20px"
    };

    span = {
        marginLeft: "5px",
        marginRight: "5px"
    };

    componentWillReceiveProps(nextProps) {
        const {
            categoryAdded
        } = this.props;

        const {
            categoryAdded: nextCategoryAdded
        } = nextProps;

        if (!categoryAdded && nextCategoryAdded && nextCategoryAdded === "success") {
            this.guestPage();
        }
    }

    componentWillUnmount() {
        const {
            updateResources
        } = this.props;

        updateResources(null, POPULATE_KEY_ADD_CATEGORY, TYPE_ADD_CATEGORY);
    }

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

    guestPage() {
        const {
            history
        } = this.props;

        history.push("/guests");
    }

    addSubCategoryPage() {
        const {
            history
        } = this.props;

        history.push("/addSubCategory");
    }

    generateButtonPanel() {
        return (
            <div style={this.buttonPanel}>
                <Button onClick={() => this.guestPage()}
                        style={this.buttonStyle}
                        variant="primary"
                        type="button">Guests</Button>
                <span style={this.span}/>
                <Button onClick={() => this.addSubCategoryPage()}
                        style={this.buttonStyle}
                        variant="primary"
                        type="button">Add SubCategory</Button>
            </div>
        )
    }

    saveCategory() {
        const {
            category
        } = this.state;

        const {
            doPostCategory
        } = this.props;

        if (!category || category === "") {
            popUp("Error", "Wrong category name", null, true);
        } else {
            doPostCategory(category, "1", POPULATE_KEY_ADD_CATEGORY, TYPE_ADD_CATEGORY);
        }
    }

  render() {
      const titleJsx = (
          <div style={this.title}>Add Category</div>
      );

      const saveJsx = (
          <div>
              <hr/>
              <Button onClick={() => this.saveCategory()}>Add Category</Button>
          </div>
      );

    return (
        <div style={this.panelStyle}>
            {this.generateButtonPanel()}
            <hr/>
            {titleJsx}
            {this.generateCategory()}
            {saveJsx}
        </div>
    )
  }
}

const mapStateToProps = state => {
    const categoryAdded = state.datareducer.get(POPULATE_KEY_ADD_CATEGORY);

    return {
        categoryAdded
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        doPostCategory,
        updateResources
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);