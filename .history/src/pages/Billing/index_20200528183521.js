import React, { useState, useEffect } from 'react';
// import { Container } from './styles';

export default function Billing({ ...props }) {
  console.warn('Props > ', props);

  const [customer, setCustomer] = useState({});

  useEffect(() => {
    setCustomer({ id: props.match.params.id });
  }, []);

  return (
    <div>
      <h1>Faturamento do cliente {customer.id}</h1>
    </div>
  );
}