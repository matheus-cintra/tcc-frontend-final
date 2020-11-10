import moment from 'moment';
import { mdiFile } from '@mdi/js';
import api from '../../services/api';
import serviceOrdersMethods from '../ServiceOrder/methods';

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
      name: billing.service[0].name,
      registerSince: moment(billing.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: mdiFile,
      subtitle: 'Documentos',
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
      name: billing.service[0].name,
      registerSince: moment(billing.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: mdiFile,
      subtitle: 'Documentos',
    };
  });

  return { docs, docCount };
}

const getServiceOrder = () => serviceOrdersMethods.getRegisters();

export default {
  getRegisters,
  getRegistersBySearch,
  getServiceOrder,
};
