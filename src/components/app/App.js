import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard';
import AdvertisementsList from '../advertisement/AdvertisementsList'
import Login from '../login/Login';
import useToken from './useToken';

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <h1>Application</h1>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard" >
                        <Dashboard />
                    </Route>
                    <Route path="/advertisement">
                        <AdvertisementsList />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;