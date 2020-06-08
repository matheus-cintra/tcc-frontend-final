import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

// import { Input } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input ref={inputRef} {...rest} />
      {error && (
        <span
          style={{ color: '#f00', margin: '-5px 0 5px 30px', display: 'block' }}
        >
          {error}
        </span>
      )}
    </>
  );
}
