/* ****************************************************************************
Import de bibliotecas padrão
***************************************************************************** */
import React from 'react';
import { Switch } from 'react-router-dom';

/* ****************************************************************************
Import do Route onde é feito a validação de acesso as rotas.
***************************************************************************** */
import Route from './Route';

/* ****************************************************************************
Import das rotas da aplicação
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

/* ****************************************************************************
Definição das rotas de navegação
***************************************************************************** */
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={DashBoard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/billing/:id?" component={Billing} isPrivate />
      <Route path="/contract/:id?" component={Contract} isPrivate />
      <Route path="/customer/:id?" component={Customer} isPrivate />
      <Route path="/service/:id?" component={Service} isPrivate />
      <Route path="/service-order/:id?" component={ServiceOrder} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
