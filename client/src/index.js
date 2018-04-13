import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';

const reducer = combineReducers({
  form: reduxFormReducer,
});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector('#root')
);
// registerServiceWorker();
