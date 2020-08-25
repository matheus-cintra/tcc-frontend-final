import moment from 'moment';
import { mdiFactory, mdiAccount } from '@mdi/js';
import api from '../../services/api';

async function getCustomersList() {
  const result = await api.get('/api/v1/customers/');
  let customers = result.data.success ? result.data.data.customers : [];

  customers = customers.map(customer => {
    return {
      ...customer,
      registerSince: moment(customer.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: customer.cnpj ? mdiFactory : mdiAccount,
      subtitle: customer.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return customers;
}

export default {
  getCustomersList,
};
