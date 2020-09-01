import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import modules from './modulesInfo/reducer';
import company from './company/reducer';

export default combineReducers({
  auth,
  user,
  modules,
  company,
});
