import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { ErrorMessage, FloatLabelInput } from './styles';

export default function FloatLabel({ name, ...rest }) {
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
      <FloatLabelInput ref={inputRef} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

FloatLabel.propTypes = {
  name: PropTypes.string.isRequired,
};
