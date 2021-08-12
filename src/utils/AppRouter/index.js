import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Page403 from './../../pages/_commons/403'

export const AppRouter = ({ component: Component, layout: Layout, authenticated: Authenticated, ...rest }) => {

    const isLoggedIn = Authenticated;

    return (
        <Route {...rest} render={props => (
            <Layout>
                {!isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={"/dashboard"} />
                )}
            </Layout>
        )} />
    );
}

export const AuthRouter = ({ component: Component, layout: Layout, authenticated: Authenticated, ...rest }) => {

    const isLoggedIn = Authenticated;

    return (
        <Route {...rest} render={props => (
            <Layout>
                {isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={"/"} />
                )}
            </Layout>
        )} />
    );
}