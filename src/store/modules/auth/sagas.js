import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '../../../services/history';
import api from '../../../services/api';

import { signInSuccess, signUpSuccess } from './actions';
import { toast } from 'react-toastify';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, '/api/v1/login', { email, password });

  const { token, user } = response.data.data;

  yield put(signInSuccess(token, user));

  history.push('/dashboard');
}

export function* signUp({ payload }) {
  try {
    const response = yield call(api.post, '/api/v1/register', { ...payload });
    history.push('/confirmation');
  } catch (err) {
    toast.error(err.response.data.description);
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
