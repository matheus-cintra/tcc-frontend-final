import moment from 'moment';
import { mdiFactory, mdiAccount } from '@mdi/js';
import api from '../../services/api';

async function getRegisters(limit = undefined, skip = undefined) {
  let uri;

  if (limit && skip) {
    uri = `/api/v1/billings?limit=${limit}&skip=${skip}`;
  } else if (limit && !skip) {
    uri = `/api/v1/billings?limit=${limit}`;
  } else if (!limit && skip) {
    uri = `/api/v1/billings?skip=${skip}`;
  } else {
    uri = `/api/v1/billings`;
  }

  const result = await api.get(uri);

  let docs = result.data.success ? result.data.data.billings : [];
  const docCount = result.data.success ? result.data.data.qty : 0;

  docs = docs.map(billing => {
    return {
      ...billing,
      registerSince: moment(billing.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: billing.cnpj ? mdiFactory : mdiAccount,
      subtitle: billing.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

async function getRegistersBySearch(search) {
  const result = await api.get(`/api/v1/get-billing-by-search/${search}`);

  let docs = result.data.success ? result.data.billings : [];
  const docCount =
    result.data.success && result.data.qty > 0 ? result.data.qty : 0;

  docs = docs.map(billing => {
    return {
      ...billing,
      registerSince: moment(billing.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: billing.cnpj ? mdiFactory : mdiAccount,
      subtitle: billing.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

export default {
  getRegisters,
  getRegistersBySearch,
};
