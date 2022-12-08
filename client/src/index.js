import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import WebFont from 'webfontloader';
// import { setServiceWorkerStatus } from './actions';
import rootReducer from './reducers';
import App from './components/App';
import './assets/css/main.css';
// import registerServiceWorker from './registerServiceWorker';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const store = (
  window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore
)(rootReducer);

// Load Roboto font
WebFont.load({
  google: {
    families: ['Roboto:300,400,500', 'sans-serif'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
// registerServiceWorker(updateServiceWorkerStatus);
serviceWorkerRegistration.register();
