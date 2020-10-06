import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { ErrorMessage, TextArea } from './styles';

export default function InputTextArea({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

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

  return (
    <>
      <TextArea ref={inputRef} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

InputTextArea.propTypes = {
  name: PropTypes.string.isRequired,
};
