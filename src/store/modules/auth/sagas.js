import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import history from '../../../services/history';
import api from '../../../services/api';

import { signInSuccess, logoutUser } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/api/v1/login', { email, password });
    const { token, userToFront } = response.data.data;
    console.warn('userToFront > ', userToFront);

    api.defaults.headers['auth-token'] = token;
    api.defaults.headers['account-id'] = userToFront._id;

    if (userToFront.logo) {
      const imageProfile = yield call(
        api.get,
        `api/v1/attachments/${userToFront.logo}`
      );
      userToFront.imageLink = imageProfile.data.data.fileLink;
    }

    yield put(signInSuccess(token, userToFront));

    history.push('/dashboard');
  } catch (err) {
    console.warn('err > ', err.response);
    toast.error(err.response.data.data.message);
  }
}

export function* signUp({ payload }) {
  try {
    yield call(api.post, '/api/v1/register', { ...payload });
    history.push('/confirmation');
  } catch (err) {
    toast.error(err.response.data.description);
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  const accountId =
    payload.user && payload.user.profile && payload.user.profile._id;

  const user = jwt.decode(token);
  const currTime = new Date().getTime() / 1000;

  if (!user) return;

  if (currTime > user.exp) {
    yield put(logoutUser());
    return history.push('/');
  }

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
