import React from "react";
import "./Registration.css"
import UserService from "../../services/UserService";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            secondName: "",
            phone: "",
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewUserInfo = this.addNewUserInfo.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
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
        UserService.registerNewUser(user);
    }

    render() {
        return (
            <div>
                <div>First name <span className="required-field"/> <label htmlFor="firstName"/><input id="firstName"
                                                                                                      type="text"
                                                                                                      onChange={event =>
                                                                                                          this.setState({firstName: event.target.value})}/>
                </div>
                <div>Second name <span className="required-field"/> <label htmlFor="secondName"/><input id="secondName"
                                                                                                        type="text"
                                                                                                        onChange={event =>
                                                                                                            this.setState({secondName: event.target.value})}/>
                </div>
                <div>Phone <span className="required-field"/> <label htmlFor="phone"/>
                    <input id="phone" type="text" onChange={event =>
                        this.setState({phone: event.target.value})}/></div>

                <div>Email<span className="required-field"/> <label htmlFor="email"/>
                    <input id="email" type="text" onChange={event =>
                        this.setState({email: event.target.value})}/>
                </div>

                <div>Password <span className="required-field"/> <label htmlFor="password"/>
                    <input id="password"
                           type="password" onChange={event =>
                        this.setState({password: event.target.value})}/>
                </div>

                <div>
                    <input id="create-user-button" type="button" onClick={this.addNewUserInfo} value="Sign up"/></div>
            </div>
        )
    }
}

export default Registration;