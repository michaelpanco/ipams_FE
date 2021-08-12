import React from 'react';
import PropTypes from 'prop-types';
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

const SystemAppRouter = ({ authenticated }) => (
    
    <Router>
      
        <div className="container">
            <Switch>

                <AppRouter exact path='/' layout={LayoutPlain} component={Login} authenticated={authenticated} />
                <AuthRouter exact path='/dashboard' permission='access_dashboard' layout={LayoutDefaultInterior} component={Dashboard} authenticated={authenticated} />
                <AppRouter layout={LayoutPlain} component={Page404} />

            </Switch>
        </div>
        
    </Router>
    
);

export default SystemAppRouter;