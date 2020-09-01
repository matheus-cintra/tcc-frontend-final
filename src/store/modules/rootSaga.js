import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import modules from './modulesInfo/sagas';
import company from './company/sagas';

export default function* rootSaga() {
  return yield all([auth, user, modules, company]);
}
