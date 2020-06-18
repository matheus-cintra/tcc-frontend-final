import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Modal({ children, open }) {
  return (
    open && (
      <S.Container>
        <S.Card>{children}</S.Card>
      </S.Container>
    )
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
