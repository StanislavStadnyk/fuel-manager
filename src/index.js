import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

import './css/styles/index.css'
import App from './containers/App'
import reducers from './redux/reducers'

import createHistory from 'history/createBrowserHistory'

import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from './css/components/customTheme'

const history = createHistory()
const store = process.env.NODE_ENV !== 'production'
  ? createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)))
  : createStore(reducers, applyMiddleware(thunk))

render(
  <MuiThemeProvider theme={customTheme}>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
