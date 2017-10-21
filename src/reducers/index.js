import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import user from './user';
export default combineReducers({
  user,
  form: reduxFormReducer
});
