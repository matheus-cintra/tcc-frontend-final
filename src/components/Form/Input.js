import React, { useEffect } from 'react';
import { useField } from '@unform/core';

import { Input } from './styles';

export default function Input({ name }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {}, []);
  return <input />;
}
