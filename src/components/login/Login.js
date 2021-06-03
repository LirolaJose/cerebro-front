import React from 'react';
import './Login.css';
import AuthService from "../../services/AuthService";
import RedirectTo from "../route/RedirectTo";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        }
        this.collectAndSendCredentials = this.collectAndSendCredentials.bind(this);
    }
    collectAndSendCredentials(){
        const credentials = {
            login: this.state.login,
            password: this.state.password
        }
        AuthService.loginUser(credentials)
            .then(res => RedirectTo.redirectToHome());
    }

    render() {
        return (
            <div className="login-wrapper">
                <h1>Please Log In</h1>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={event => this.setState({login: event.target.value})}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={event => this.setState({password: event.target.value})}/>
                    </label>
                    <div>
                        <button type="submit" onClick={this.collectAndSendCredentials}>Submit</button>
                    </div>
            </div>
        )
    }
}

export default Login;