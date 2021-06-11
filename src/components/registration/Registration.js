import React from "react";
import "./Registration.css"
import "../login/Login.css"
import AuthService from "../../services/AuthService";
import RedirectTo from "../route/RedirectTo";
import {Button, Col, Form} from "react-bootstrap";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            secondName: "",
            phone: "",
            email: "",
            password: "",
            showPassword: false
        }
        this.showPassword = this.showPassword.bind(this);
        this.addNewUserInfo = this.addNewUserInfo.bind(this);
    }

    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    addNewUserInfo() {
        const user = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password
        }
        AuthService.registerNewUser(user)
            .then(result => {
                RedirectTo.redirectToHome();
            });
    }

    render() {
        const {showPassword} = this.state;
        return (
            <div className="form-wrapper">
                <Form className="w-25">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label className="required-f">First name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" className="required-field"
                                          onChange={event => this.setState({firstName: event.target.value})}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className="required-f">Second name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your second name"
                                          onChange={event => this.setState({secondName: event.target.value})}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label className="required-f">Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter your phone"
                                          onChange={event => this.setState({phone: event.target.value})}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className="required-f">Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your second email"
                                          onChange={event => this.setState({email: event.target.value})}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group className="align-items-center" controlId="formBasicPassword">
                        <Form.Label className="required-f">Password</Form.Label>
                        <Form.Control type={showPassword ? "text" : "password"} placeholder="Password"
                                      onChange={event => this.setState({password: event.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Show password" onChange={this.showPassword}/>
                    </Form.Group>

                    <Button type="submit" variant="primary" onClick={this.addNewUserInfo}>Sign Up</Button>

                </Form>
            </div>
        )
    }
}

export default Registration;
