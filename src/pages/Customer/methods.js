import api from '../../services/api';

async function getCustomersList() {
  const result = await api.get('/api/v1/customers/');
  return result.data.customers;
}

export default {
  getCustomersList,
};
