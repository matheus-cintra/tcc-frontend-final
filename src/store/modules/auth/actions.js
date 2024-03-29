export function signInRequest(email, password, setLogging) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password, setLogging },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function logoutUser() {
  return {
    type: '@auth/LOGOUT_USER',
  };
}

export function signUpRequest(payload) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { ...payload },
  };
}
