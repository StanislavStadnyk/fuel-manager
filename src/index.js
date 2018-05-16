import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import logger from 'redux-logger'

import './css/index.css';
import App from './components/App';
import reducers from './reducers';

import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import StationsPage from './components/pages/StationsPage';

import * as firebase from 'firebase';
var config = {
	apiKey: "AIzaSyDSe7h9cFHRzmXWKL8_db4DLQ6vNzYanRU",
	authDomain: "fuel-manager-f1d75.firebaseapp.com",
	databaseURL: "https://fuel-manager-f1d75.firebaseio.com",
	projectId: "fuel-manager-f1d75",
	storageBucket: "fuel-manager-f1d75.appspot.com",
	messagingSenderId: "57775689014"
};
firebase.initializeApp(config);

// import Directories from './components/Directories';
// import NoticePage from './components/NoticePage';
// import SearchPage from './components/SearchPage';
// import Error404 from './components/Error404';

const store = process.env.NODE_ENV !== 'production'
	? createStore( reducers, composeWithDevTools( applyMiddleware( thunk, logger ) ))
	: createStore( reducers, applyMiddleware( thunk ))

const history = syncHistoryWithStore(browserHistory, store)

render(
	<Provider store={store}>
	    <Router history={history}>

			{/* Directories */}
	      	<Route path="/" component={App}>
			  	<IndexRoute component={HomePage} />
				<Route path='profile' component={ProfilePage} />
				<Route path='stations' component={StationsPage} />
	      	</Route>

			
			{/* <Route path="/notices/:id" component={NoticePage}/>

			
			<Route path="/search/:id" component={SearchPage}/>

		  	
			<Route path="*" component={Error404}/> */}
	    </Router>
  	</Provider>,
	document.getElementById('root')
);
