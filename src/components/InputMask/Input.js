import React, { useEffect, useRef } from 'react';
import ReactInputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { ErrorMessage } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      // setValue(ref, value) {
      //   ref.setInputValue(value);
      // },
      // clearValue(ref) {
      //   ref.setInputValue('');
      // },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ReactInputMask ref={inputRef} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
