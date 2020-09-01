import React from 'react';
import PropTypes from 'prop-types';

import { Container, Border, Content } from './styles';

function Divider({ children }) {
  return (
    <Container>
      <Border style={{ width: '5%' }} />
      <Content>{children}</Content>
      <Border />
    </Container>
  );
}

export default Divider;

Divider.propTypes = {
  children: PropTypes.string.isRequired,
};
