import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {TopUpBalance} from "../../services/UserService"

export const HeaderInfo = (props) => {
    const history = useHistory();
    const [moneyAmount, setMoneyAmount] = useState(props.user?.moneyAmount)
    const [money, setMoney] = useState();

    return (
        <div className="wrapper">
            <h1><Link to="/advertisement">CEREBRO</Link></h1>
            {props.isAuthenticated === false
                ? <div>
                    <button onClick={() => history.push("/login")}>Login</button>
                    <button disabled onClick={() => history.push('/advertisement/new')}>New</button>
                </div>

                : <div>
                    <button onClick={() => history.push("/logout")}>Logout</button>
                    <button onClick={() => history.push('/advertisement/new')}>New</button>
                    <div>
                        Logged user: {props.user.email} <br/>
                        Balance: {moneyAmount} <br/>
                        <input type="number" value={money} step={1} min={1} placeholder="enter amount"
                               onChange={event => setMoney(event.target.value)}/>

                        <input type="button" disabled={!money} onClick={() =>{
                            setMoney("");
                            TopUpBalance({userId: props.user.id, money: money})
                                .then(res =>
                                    res.json()
                                        .then(newMoneyAmount => {
                                            setMoneyAmount(newMoneyAmount.value);
                                        }))}
                        }
                               value="TOP UP THE BALANCE"/>
                    </div>
                </div>
            }
        </div>
    )
}