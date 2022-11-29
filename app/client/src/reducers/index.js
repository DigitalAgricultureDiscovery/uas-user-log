import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import serviceWorkerStatus from './serviceWorkerStatus';

export default combineReducers({
  form: reduxFormReducer,
  serviceWorkerStatus: serviceWorkerStatus,
});
