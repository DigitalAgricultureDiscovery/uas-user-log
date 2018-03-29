import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import App from './components/App';

// ReactGA.initialize('UA-78284792-5');
// ReactGA.pageview(window.location.pathname + window.location.search);

const reducer = combineReducers({
  form: reduxFormReducer,
});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <App dispatch={ store.dispatch } />
  </Provider>,
  document.querySelector('#root')
);
