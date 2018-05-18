import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import logger from 'redux-logger'

import './css/styles/index.css';
import App from './components/App';
import reducers from './reducers';

import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import StationsPage from './components/pages/StationsPage';
import Error404 from './components/Error404';

const store = process.env.NODE_ENV !== 'production'
	? createStore( reducers, composeWithDevTools( applyMiddleware( thunk, logger ) ))
	: createStore( reducers, applyMiddleware( thunk ))

const history = syncHistoryWithStore(browserHistory, store);

import { SUB_PATH } from './constants';

render(
	<Provider store={store}>
	    <Router history={history}>
			{/* Main pages */}
	      	<Route path={`${SUB_PATH}/`} component={App}>
			  	<IndexRoute component={HomePage} />
				<Route path={`${SUB_PATH}/profile`} component={ProfilePage} />
				<Route path={`${SUB_PATH}/stations`} component={StationsPage} />
				
	      	</Route>
			<Route path="*" component={Error404}/>
	    </Router>
  	</Provider>,
	document.getElementById('root')
);
