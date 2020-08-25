import api from '../../services/api';

async function getGraphicsInfo() {
  const result = await api.get('/api/v1/customers/');
  let customers = result.data.success ? result.data.data.customers : [];

  customers = customers.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return customers;
}

export default { getGraphicsInfo };
