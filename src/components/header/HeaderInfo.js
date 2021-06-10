import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {TopUpBalance} from "../../services/UserService"
import Logo from "../../image/logo.png";
import {ButtonGroup, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css"

export const HeaderInfo = (props) => {
    const [moneyAmount, setMoneyAmount] = useState(props.user?.moneyAmount)
    const [money, setMoney] = useState();

    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="/advertisement"><img src={Logo} alt="Loading..."/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Link to={"/advertisement/new"}
                          className={!props.isAuthenticated ? "btn btn-secondary disabled" : "btn btn-primary"}>New
                        Advertisement</Link>
                </Nav>

            </Navbar.Collapse>

            {!props.isAuthenticated
                ? <Navbar.Text className="justify-content-end">
                    <ButtonGroup vertical>
                        <Link to="/login" className="btn btn-outline-success">Login</Link>
                        <Link to="/registration" className="btn btn-outline-success">Registration</Link>
                    </ButtonGroup>
                </Navbar.Text>

                : <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <h6 className="logged-user">  Logged user: <text className="user-email">{props.user.email}</text> </h6>

                        <h6 className="balance"> Balance: <text className="money-amount" > {moneyAmount} $</text></h6>

                        <input type="number" value={money} step={1} min={1} placeholder="enter amount"
                               onChange={event => setMoney(event.target.value)}/><br/>

                        <input type="button" disabled={!money} onClick={() => {
                            setMoney("");
                            TopUpBalance({userId: props.user.id, money: money})
                                .then(res => {
                                    res.json()
                                        .then(newMoneyAmount => {
                                            setMoneyAmount(newMoneyAmount.value);
                                        })
                                })
                        }}
                               value="TOP UP THE BALANCE"/>
                    </Navbar.Text>

                    <Link className="btn btn-danger" to={"/logout"}>Logout</Link>
                </Navbar.Collapse>
            }
            <hr/>
        </Navbar>

    )
}
