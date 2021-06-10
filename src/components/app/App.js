import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import AdvertisementsList from '../advertisement_list/AdvertisementsList';
import Advertisement from '../advertisement/Advertisement';
import NewAdvertisement from '../new_advertisement/NewAdvertisement';
import Login from '../login/Login';
import OrderAdvertisement from "../order_advertisement/OrderAdvertisement";
import Registration from "../registration/Registration";
import GuardedRoute from "../route/GuardedRoute";
import AuthService from "../../services/AuthService";
import {HeaderInfo} from "../header/HeaderInfo";
import {Spinner} from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isAuthenticated: false,
            user: null
        }

    }

    componentDidMount() {
        AuthService.getCurrentUser()
            .then(user => {
                this.setState({
                    isLoaded: true,
                    user: user.value,
                    isAuthenticated: user.value !== null
                })
            })
    }


    render() {
        const {isAuthenticated, isLoaded, user} = this.state;
        if (!isLoaded) {
            return (
                <Spinner animation="border" className="justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>)
        } else {
            return (
                <Router>
                    <Route path="/" component={() => <HeaderInfo user={user} isAuthenticated={isAuthenticated}/>}/>

                    <Switch>
                        <GuardedRoute path="/advertisement/order/:id" component={OrderAdvertisement}
                                      auth={isAuthenticated}/>
                        <GuardedRoute path="/advertisement/new" component={NewAdvertisement}
                                      auth={isAuthenticated}/>
                        <Route path="/advertisement/:id" component={Advertisement} auth={isAuthenticated}/>
                        <Route path="/advertisement" component={AdvertisementsList}/>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={AuthService.logoutUser}/>
                        <Route path="/" render={() => <Redirect to="/advertisement"/>}/>
                    </Switch>
                </Router>
            );
        }
    }
}

export default App;
