/* ****************************************************************************
Imports de bibliotecas padrão
***************************************************************************** */
import React from 'react';
import { Switch } from 'react-router-dom';

/* ****************************************************************************
Import do Route onde é feito a validação de acesso as rotas.
***************************************************************************** */
import Route from './Route';

/* ****************************************************************************
Imports das rotas da aplicação
***************************************************************************** */
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashBoard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Billing from '../pages/Billing';
import Contract from '../pages/Contract';
import Customer from '../pages/Customer';
import Service from '../pages/Service';
import ServiceOrder from '../pages/ServiceOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={DashBoard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/billing" component={Billing} isPrivate />
      <Route path="/contract" component={Contract} isPrivate />
      <Route path="/customer" component={Customer} isPrivate />
      <Route path="/service" component={Service} isPrivate />
      <Route path="/service-order" component={ServiceOrder} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
