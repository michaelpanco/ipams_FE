import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AppRouter, AuthRouter } from './utils/AppRouter'

// Layouts
import LayoutDefaultInterior from './layouts/DefaultInterior';
import LayoutPlain from './layouts/LayoutPlain';

//Commons
import Page404 from './pages/_commons/404';

//Pages
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import IPAddress from './pages/ipaddress'
import IPAddressDetails from './pages/ipaddress/details'
import Activities from './pages/activities'

const SystemAppRouter = ({ authenticated, checked }) => (
    
    <Router>
       { checked &&
        <div className="container">
            <Switch>
                <AppRouter exact path='/' layout={LayoutPlain} component={Login} authenticated={authenticated} />
                <AuthRouter exact path='/dashboard' layout={LayoutDefaultInterior} component={Dashboard} authenticated={authenticated} />
                <AuthRouter exact path='/ipaddress' layout={LayoutDefaultInterior} component={IPAddress} authenticated={authenticated} />
                <AuthRouter exact path='/ipaddress/:id' layout={LayoutDefaultInterior} component={IPAddressDetails} authenticated={authenticated} />
                <AuthRouter exact path='/activities' layout={LayoutDefaultInterior} component={Activities} authenticated={authenticated} />
                <AppRouter layout={LayoutPlain} component={Page404} />

            </Switch>
        </div>
        }
        
    </Router>
    
);

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated,
    checked: session.checked,
});

export default connect(mapStateToProps)(SystemAppRouter);