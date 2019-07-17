import React, {Component} from "react";
import logo from "../media/images/dossier-logo.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LoginForm extends Component {

    col_md_12 = {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        marginBottom: "15px",
    };

    render() {
        const {
            change,
            click,
            value,
            keyPress
        } = this.props;

        return (
            <div>
                <div className="col-md-12" style={this.col_md_12}>
                    <div className="col-md-12">
                        <img className="rounded" width="70px" style={this.rounded} src={logo} alt="dossier"/>
                        <div className="page-header">
                            <h4># Jovan and Danica wedding App</h4>
                            <small>PLease fill email and password!</small>
                        </div>
                    </div>
                </div>

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <hr/>
                    <Button variant="primary" type="submit">
                        LogIn
                    </Button>
                </Form>
            </div>
        );
    }
}

export default LoginForm;
