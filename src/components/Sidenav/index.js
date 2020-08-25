import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react';
import { Container } from './styles';
import routes from './routesTemplate';
import { store } from '../../store';

export default function Sidenav() {
  const account = store.getState();
  const userName = account.user.profile.name;

  return (
    <Container>
      <header>
        <img
          src="https://api.adorable.io/avatars/100/abott@adorable.png"
          alt="Logo"
        />
        <h2>{userName}</h2>
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
