import React, {Component} from "react";
import logo from "../media/images/logo.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LoginForm extends Component {

    col_md_12 = {
        display: "flex",
        textAlign: "left",
        marginBottom: "20px",
        marginTop: "20px",
        paddingRight: "0px",
        paddingLeft: "0px"
    };

    col_md_12_extended = {
        paddingRight: "0px",
        paddingLeft: "0px"
    };

    buttonStyle = {
        marginBottom: "20px"
    };

    rounded = {
        marginTop: "10px",
        borderRadius: "30%",
    };

    render() {
        const {
            click,
            keyPress,
            email,
            password,
            changePassword,
            changeEmail
        } = this.props;

        return (
            <div>
                <div className="col-md-12" style={this.col_md_12}>
                    <div className="col-md-12" style={this.col_md_12_extended}>
                        <img className="rounded" width="150px" style={this.rounded} src={logo} alt="dossier"/>
                        <div className="page-header">
                            <h4># Jovan & Danica wedding App</h4>
                            <small>Molimo vas da unesete email i password!</small>
                        </div>
                    </div>
                </div>

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email adresa</Form.Label>
                        <Form.Control onChange={changeEmail} value={email} type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Sifra</Form.Label>
                        <Form.Control onChange={changePassword} value={password} type="password"
                                      placeholder="Password"/>
                    </Form.Group>
                    <hr/>
                    <Button style={this.buttonStyle} onClick={click} onKeyPress={keyPress} variant="primary"
                            type="button">
                        Uloguj se!
                    </Button>
                </Form>
            </div>
        );
    }
}

export default LoginForm;
