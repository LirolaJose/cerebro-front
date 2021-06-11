import React from 'react';
import './Login.css';
import AuthService from "../../services/AuthService";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            showPassword: false
        }
        this.showPassword = this.showPassword.bind(this);
        this.collectAndSendCredentials = this.collectAndSendCredentials.bind(this);

    }

    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    collectAndSendCredentials() {
        const credentials = {
            login: this.state.login,
            password: this.state.password
        }
        AuthService.loginUser(credentials);
    }

    render() {
        const {showPassword} = this.state;
        return (
            <div className="form-wrapper">
                <Form className="w-25">
                    <Form.Group className="text-lg-center" controlId="formBasicEmail">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                      onChange={event => this.setState({login: event.target.value})}/>
                    </Form.Group>

                    <Form.Group className="text-lg-center" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={showPassword ? "text" : "password"} placeholder="Password"
                                      onChange={event => this.setState({password: event.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Show password" onChange={this.showPassword}/>
                    </Form.Group>

                    <Button type="button" variant="primary" onClick={this.collectAndSendCredentials}>Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login;
