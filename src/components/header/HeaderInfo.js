import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TopUpBalance } from "../../services/UserService"
import Logo from "../../image/logo.png";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export const HeaderInfo = (props) => {
    const history = useHistory();
    const [moneyAmount, setMoneyAmount] = useState(props.user?.moneyAmount)
    const [money, setMoney] = useState();

    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="/advertisement"><img src={Logo} alt="Loading..."/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {!props.isAuthenticated
                    ? <Nav>
                        <button disabled onClick={() => history.push('/advertisement/new')}>New Advertisement</button>
                    </Nav>

                    : <Nav>
                        <button onClick={() => history.push('/advertisement/new')}>New Advertisement</button>
                    </Nav>
                }
                </Navbar.Collapse>

            {!props.isAuthenticated
                ? <Navbar.Text className="justify-content-end">
                    <button onClick={() => history.push("/login")}>Login</button> <br/>
                    <button onClick={() => history.push("/registration")}>Registration</button>
                </Navbar.Text>

                : <Navbar.Text >
                    Logged user: {props.user.email} <br/>
                    Balance: {moneyAmount} $ <br/>
                    <input type="number" value={money} step={1} min={1} placeholder="enter amount"
                           onChange={event => setMoney(event.target.value)}/>

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
                           value="TOP UP THE BALANCE"/> <br/>
                    <button onClick={() => {
                        if(window.confirm("Are you sure you want to logout?")){
                        history.push("/logout")
                    }}}>Logout</button>

                </Navbar.Text>
            }
            <hr/>
        </Navbar>

    )
}