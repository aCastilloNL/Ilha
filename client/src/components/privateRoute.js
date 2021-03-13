import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const UserRoute = ({ component, path, ...rest}) => {
    const { isAuthenticated } = useSelector(
        (state) => state.authentication
    );

    return isAuthenticated === true ? (
        <Route exact path={path} component={component} {...rest} />
    ) : (
            <Redirect to={'/'} />
        );
};