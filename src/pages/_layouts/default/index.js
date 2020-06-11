import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import Sidenav from '../../../components/Sidenav';
// import Sidenav from '../../../components/Sidenav';

import { Wrapper, Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Sidenav />
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
