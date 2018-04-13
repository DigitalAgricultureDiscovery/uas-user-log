import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { setServiceWorkerStatus } from './actions';
import rootReducer from './reducers';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(rootReducer);

const updateServiceWorkerStatus = (status) => {
  store.dispatch(setServiceWorkerStatus(status));
}

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector('#root')
);
registerServiceWorker(updateServiceWorkerStatus);
