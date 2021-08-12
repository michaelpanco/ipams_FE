import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { createStore, applyMiddleware } from 'redux';
import isAuth from './utils/IsAuth'
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Routers from './router';
import rootReducer from "./reducers";
import theme from './styles/muitheme'

import './styles/global.css'

// Support Environment variables
require('dotenv').config()

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const validateSession = (session) => {
    return isAuth();
}

const options = { refreshOnCheckAuth: false, redirectPath: '/', driver: 'COOKIES', validateSession};

sessionService.initSessionService(store, options);

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<React.StrictMode>
				<Routers />
			</React.StrictMode>
		</Provider>

	</MuiThemeProvider>,

	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
