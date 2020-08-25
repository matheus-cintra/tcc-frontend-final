import api from '../../services/api';

async function getCustomersList() {
  const result = await api.get('/api/v1/customers/');
  const customers = result.data.success ? result.data.data.customers : [];

  return customers;
}

export default {
  getCustomersList,
};
