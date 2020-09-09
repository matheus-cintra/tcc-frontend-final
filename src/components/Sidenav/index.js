import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react';
import { connect } from 'react-redux';
import { Container } from './styles';
import routes from './routesTemplate';
import { store } from '../../store';

function Sidenav() {
  const companyInfo = store.getState();
  const { companyName } = companyInfo.company;
  const { companyImage } = companyInfo.company;
  console.warn('companyInfo :> ', companyInfo);

  return (
    <Container>
      <header>
        <img
          src={
            companyImage ||
            'https://api.adorable.io/avatars/100/abott@adorable.png'
          }
          alt="Logo"
        />
        <h2>{companyName}</h2>
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

export default connect(state => ({
  company: state.company,
}))(Sidenav);
