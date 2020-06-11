import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/api/v1/login', { email, password });
    console.warn('response > ', response);

    const { token, user } = response.data.data;

    console.warn('user > ', user);

    api.defaults.headers['auth-token'] = token;
    api.defaults.headers['account-id'] = user._id;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.description);
  }
}

export function* signUp({ payload }) {
  try {
    const response = yield call(api.post, '/api/v1/register', { ...payload }); //eslint-disable-line

    console.warn('IMPLEMENTAR CHECAGEM DE REGISTRO'); // eslint-disable-line

    history.push('/confirmation');
  } catch (err) {
    toast.error(err.response.data.description);
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  const accountId =
    payload.user && payload.user.profile && payload.user.profile._id;

  if (token && accountId) {
    api.defaults.headers['auth-token'] = token;
    api.defaults.headers['account-id'] = accountId;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
