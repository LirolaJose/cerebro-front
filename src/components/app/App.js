import React from 'react';
import {BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
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
            .then(res => res.json())
            .then(user => {
                if (user.value === null) {
                    localStorage.removeItem("token")
                }
                console.log(user)
                this.setState({
                    isLoaded: true,
                    user: user.value,
                    isAuthenticated: user.value !== null
                })
            });
    }


    render() {
        const {isAuthenticated, isLoaded, user} = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                    <Router>
                        <Route path="/" component={() => <HeaderInfo  user={user} isAuthenticated={isAuthenticated} />} />
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
                        </Switch>
                    </Router>
            );
        }
    }
}

export default App;