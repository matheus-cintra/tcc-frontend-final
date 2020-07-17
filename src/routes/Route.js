import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useDispatch } from 'react-redux';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '../store';
import { logoutUser } from '../store/modules/auth/actions';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  title,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const account = store.getState();
  const { token } = account.auth;
  const currTime = new Date().getTime() / 1000;
  const decoded = jwt.decode(token);
  const expired = decoded && currTime > decoded.exp;
  const dispatch = useDispatch();

  if (expired) {
    dispatch(logoutUser());
    return <Redirect to="/" />;
  }

  if (title) window.document.title = title;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  title: PropTypes.string.isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
