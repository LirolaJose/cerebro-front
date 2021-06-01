import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdvertisementsList from '../advertisement_list/AdvertisementsList';
import Advertisement from '../advertisement/Advertisement';
import NewAdvertisement from '../new_advertisement/NewAdvertisement';
import Login from '../login/Login';
import useToken from '../../services/useToken';
import OrderAdvertisement from "../order_advertisement/OrderAdvertisement";
import Registration from "../registration/Registration";

function App() {
    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <h1>Application</h1>
            <Router>
                <Switch>
                    <Route path="/advertisement/order/:id" component={OrderAdvertisement}/>
                    <Route path="/advertisement/new" component={NewAdvertisement}/>
                    <Route path="/advertisement/:id" component={Advertisement}/>
                    <Route  path="/advertisement" component={AdvertisementsList}/>
                    <Route path="/registration" component={Registration}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;