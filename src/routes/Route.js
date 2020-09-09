import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useDispatch } from 'react-redux';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '../store';
import { logoutUser } from '../store/modules/auth/actions';
import { setModuleInfo } from '../store/modules/modulesInfo/actions';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  title,
  moduleName,
  moduleApi,
  hasSearchBar,
  ...rest
}) {
  const { signed } = store.getState().auth;
  // const signed = true;
  const account = store.getState();
  const { token } = account.auth;
  const currTime = new Date().getTime() / 1000;
  const decoded = jwt.decode(token);
  const expired = decoded && currTime > decoded.exp;

  const dispatch = useDispatch();

  const moduleInfo = {
    moduleName,
    moduleApi,
    hasSearchBar,
  };
  dispatch(setModuleInfo(moduleInfo));

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
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.any,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  moduleName: PropTypes.string,
  moduleApi: PropTypes.string,
  hasSearchBar: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  moduleName: '',
  moduleApi: '',
  hasSearchBar: false,
};
