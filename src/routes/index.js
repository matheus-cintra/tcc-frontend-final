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
import ConfirmationRegister from '../pages/ConfirmationRegister';

/* ****************************************************************************
Definição das rotas de navegação
***************************************************************************** */
export default function Routes() {
  return (
    <Switch>
      <Route path="/" title="SisMEI - SaaS" exact component={SignIn} />
      <Route path="/register" title="Registro" component={SignUp} />
      <Route
        path="/confirmation"
        title="Confirmação"
        exact
        component={ConfirmationRegister}
      />
      <Route
        path="/dashboard"
        title="Dashboard"
        component={DashBoard}
        isPrivate
      />
      <Route path="/profile" title="Perfil" component={Profile} isPrivate />
      <Route
        path="/billing/:id?"
        title="Faturamento"
        component={Billing}
        isPrivate
      />
      <Route
        path="/contract/:id?"
        title="Contratos"
        component={Contract}
        isPrivate
      />
      <Route
        path="/customer/:id?"
        title="Clientes"
        component={Customer}
        isPrivate
      />
      <Route
        path="/service/:id?"
        title="Serviços"
        component={Service}
        isPrivate
      />
      <Route
        path="/service-order/:id?"
        title="Ordem de Serviço"
        component={ServiceOrder}
        isPrivate
      />

      <Route
        path="/"
        title="Página não encontrada"
        component={() => <h1>404</h1>}
      />
    </Switch>
  );
}
