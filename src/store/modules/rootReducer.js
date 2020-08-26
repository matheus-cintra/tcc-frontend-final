import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import modules from './modulesInfo/reducer';

export default combineReducers({
  auth,
  user,
  modules,
});
