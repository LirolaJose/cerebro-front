import React from 'react';
import {Redirect, Route} from "react-router-dom";

const GuardedRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
)

export default GuardedRoute;