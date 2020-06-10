import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import services from './services/reducer';

export default combineReducers({
  auth,
  user,
  services,
});
