import moment from 'moment';
import { mdiFactory, mdiAccount } from '@mdi/js';
import api from '../../services/api';

async function getRegisters(limit = undefined, skip = undefined) {
  let uri;

  if (limit && skip) {
    uri = `/api/v1/customers?limit=${limit}&skip=${skip}`;
  } else if (limit && !skip) {
    uri = `/api/v1/customers?limit=${limit}`;
  } else if (!limit && skip) {
    uri = `/api/v1/customers?skip=${skip}`;
  } else {
    uri = `/api/v1/customers`;
  }

  const result = await api.get(uri);

  let docs = result.data.success ? result.data.data.customers : [];
  const docCount = result.data.success ? result.data.data.qty : 0;

  docs = docs.map(customer => {
    return {
      ...customer,
      registerSince: moment(customer.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: customer.cnpj ? mdiFactory : mdiAccount,
      subtitle: customer.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

async function getRegistersBySearch(search) {
  const result = await api.get(`/api/v1/get-customer-by-search/${search}`);

  let docs = result.data.success ? result.data.customers : [];
  const docCount =
    result.data.success && result.data.qty > 0 ? result.data.qty : 0;

  docs = docs.map(customer => {
    return {
      ...customer,
      registerSince: moment(customer.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: customer.cnpj ? mdiFactory : mdiAccount,
      subtitle: customer.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

export default {
  getRegisters,
  getRegistersBySearch,
};
