import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiViewDashboard,
  mdiAccountSupervisor,
  mdiAccount,
  mdiCogs,
} from '@mdi/js';
import { Container } from './styles';
import routes from './routesTemplate';

export default function Sidenav() {
  return (
    <Container>
      <header>
        <img
          src="https://api.adorable.io/avatars/100/abott@adorable.png"
          alt="Logo"
        />
        <h2>Matheus Cintra</h2>
      </header>
      <ul>
        {routes.map(route => (
          <li key={route.name}>
            <NavLink to={route.route} activeClassName="active">
              <Icon
                path={route.icon}
                title={route.title}
                size={route.size}
                color={route.color}
              />
              <span>{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </Container>
  );
}
