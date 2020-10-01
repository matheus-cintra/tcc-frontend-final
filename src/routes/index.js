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
import MyCompany from '../pages/MyCompany';
import Providers from '../pages/Providers';
import Billing from '../pages/Billing';
import Contract from '../pages/Contract';
import Customer from '../pages/Customer';
import Service from '../pages/Service';
import ServiceOrder from '../pages/ServiceOrder';
import ConfirmationRegister from '../pages/ConfirmationRegister';
import Attachments from '../pages/Attachments';
import RecoveryPassword from '../pages/RecoveryPassword';

/* ****************************************************************************
Definição das rotas de navegação
***************************************************************************** */
export default function Routes() {
  return (
    <Switch>
      <Route path="/" title="SisMEI - SaaS" exact component={SignIn} />
      <Route
        path="/forgot-password"
        title="SisMEI - SaaS"
        exact
        component={RecoveryPassword}
      />
      <Route
        path="/forgot-password/:token"
        title="SisMEI - SaaS"
        exact
        component={RecoveryPassword}
      />
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
        moduleName="dashboard"
        moduleApi="/api/v1/home"
        hasSearchBar={false}
      />
      <Route
        path="/my-company"
        title="Minha Empresa"
        component={MyCompany}
        isPrivate
        moduleName="company"
        moduleApi="/api/v1/company"
        hasSearchBar={false}
      />
      <Route
        path="/profile"
        title="Perfil"
        component={Profile}
        isPrivate
        moduleName="profile"
        moduleApi="/api/v1/profile"
        hasSearchBar={false}
      />
      <Route
        path="/billing/:id?"
        title="Faturamento"
        component={Billing}
        isPrivate
        moduleName="invoicing"
        moduleApi="/api/v1/invoicing"
        hasSearchBar
      />
      <Route
        path="/contract/:id?"
        title="Contratos"
        component={Contract}
        isPrivate
        moduleName="contracts"
        moduleApi="/api/v1/contracts"
        hasSearchBar
      />
      <Route
        path="/customer/:id?"
        title="Clientes"
        component={Customer}
        isPrivate
        moduleName="customers"
        moduleApi="/api/v1/get-customer-by-search"
        hasSearchBar
      />
      <Route
        path="/service/:id?"
        title="Serviços"
        component={Service}
        isPrivate
        moduleName="services"
        moduleApi="/api/v1/services"
        hasSearchBar
      />
      <Route
        path="/service-order/:id?"
        title="Ordem de Serviço"
        component={ServiceOrder}
        isPrivate
        moduleName="service-order"
        moduleApi="/api/v1/service-order"
        hasSearchBar
      />
      <Route
        path="/providers"
        title="Fornecedores"
        component={Providers}
        isPrivate
        moduleName="providers"
        moduleApi="/api/v1/providers"
        hasSearchBar
      />
      <Route
        path="/attachments"
        title="Anexos"
        component={Attachments}
        isPrivate
        moduleName="attachments"
        moduleApi="/api/v1/attachments"
        hasSearchBar
      />

      <Route
        path="/"
        title="Página não encontrada"
        component={() => <h1>404</h1>}
      />
    </Switch>
  );
}
