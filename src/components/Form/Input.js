import React, { useEffect, useRef } from 'react';
import ReactInputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { ErrorMessage, InputContainer } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  console.warn('rest > ', defaultValue);

  return (
    <InputContainer>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
