import moment from 'moment';
import { mdiFileDocument } from '@mdi/js';
import api from '../../services/api';
import helpers from '../../helpers/helper';

async function getRegisters(limit = undefined, skip = undefined) {
  let uri;

  if (limit && skip) {
    uri = `/api/v1/registration-service?limit=${limit}&skip=${skip}`;
  } else if (limit && !skip) {
    uri = `/api/v1/registration-service?limit=${limit}`;
  } else if (!limit && skip) {
    uri = `/api/v1/registration-service?skip=${skip}`;
  } else {
    uri = `/api/v1/registration-service`;
  }

  const result = await api.get(uri);

  let docs = result.data.success ? result.data.data.services : [];
  const docCount = result.data.success ? result.data.data.qty : 0;

  docs = docs.map(service => {
    const _price = helpers.formatPrice(service.price);
    return {
      ...service,
      registerSince: moment(service.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: mdiFileDocument,
      subtitle: 'Serviço',
      formatedPrice: _price,
    };
  });

  return { docs, docCount };
}

async function getRegistersBySearch(search) {
  const result = await api.get(`/api/v1/get-service-by-search/${search}`);

  let docs = result.data.success ? result.data.services : [];
  const docCount =
    result.data.success && result.data.qty > 0 ? result.data.qty : 0;

  docs = docs.map(service => {
    const _price = helpers.formatPrice(service.price);
    return {
      ...service,
      registerSince: moment(service.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: mdiFileDocument,
      subtitle: 'Serviço',
      formatedPrice: _price,
    };
  });

  return { docs, docCount };
}

export default {
  getRegisters,
  getRegistersBySearch,
};
