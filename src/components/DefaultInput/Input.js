import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { DefaultInput, ErrorMessage, Container } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <DefaultInput ref={inputRef} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
