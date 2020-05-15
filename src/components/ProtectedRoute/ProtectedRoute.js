import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {

    let loggedIn = localStorage.getItem('loggedIn');

    return (
        <Route {...rest} render={props => {
            if (loggedIn === "true") {
                return <>{children}</>
            } else {
                return <Redirect to="/"/>
            }
        }}>
        </Route>
    );
};

export default ProtectedRoute;