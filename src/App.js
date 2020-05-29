import React from 'react';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;