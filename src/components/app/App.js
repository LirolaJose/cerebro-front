import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdvertisementsList from '../advertisement_list/AdvertisementsList';
import Advertisement from '../advertisement/Advertisement';
import NewAdvertisement from '../new_advertisement/NewAdvertisement';
import Login from '../login/Login';
import OrderAdvertisement from "../order_advertisement/OrderAdvertisement";
import Registration from "../registration/Registration";
import GuardedRoute from "./GuardedRoute";

function App() {

    const[isAutheticated, setisAutheticated] = useState(false);

    function login(){
        setisAutheticated(true);
        console.log("loggedInUser:" + isAutheticated)
    }

    function logout(){
        setisAutheticated(false);
        console.log("loggedInUser:" + isAutheticated)
    }

    return (
        <div className="wrapper">
            <h1>Application</h1>
            {isAutheticated === false
                ? <button onClick={login}>Login</button>
                : <button onClick={logout}>Logout</button>
            }
            <Router>
                <Switch>
                    <GuardedRoute path="/advertisement/order/:id" component={OrderAdvertisement} auth={isAutheticated}/>
                    <GuardedRoute path="/advertisement/new" component={NewAdvertisement} auth={isAutheticated}/>
                    <GuardedRoute path="/advertisement/:id" component={Advertisement} auth={isAutheticated}/>
                    <Route  path="/advertisement" component={AdvertisementsList}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;