import moment from 'moment';
import { mdiFactory, mdiAccount } from '@mdi/js';
import api from '../../services/api';
import serviceMethods from '../Service/methods';
import customerMethods from '../Customer/methods';

async function getRegisters(limit = undefined, skip = undefined) {
  let uri;

  if (limit && skip) {
    uri = `/api/v1/service-order?limit=${limit}&skip=${skip}`;
  } else if (limit && !skip) {
    uri = `/api/v1/service-order?limit=${limit}`;
  } else if (!limit && skip) {
    uri = `/api/v1/service-order?skip=${skip}`;
  } else {
    uri = `/api/v1/service-order`;
  }

  const result = await api.get(uri);

  let docs = result.data.success ? result.data.data.serviceOrder : [];
  const docCount = result.data.success ? result.data.data.qty : 0;

  docs = docs.map(serviceorder => {
    return {
      ...serviceorder,
      name: serviceorder.customer[0].name,
      registerSince: moment(serviceorder.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: serviceorder.cnpj ? mdiFactory : mdiAccount,
      subtitle: serviceorder.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

async function getRegistersBySearch(search) {
  const result = await api.get(`/api/v1/get-service-order-by-search/${search}`);

  let docs = result.data.success ? result.data.serviceOrder : [];
  const docCount =
    result.data.success && result.data.qty > 0 ? result.data.qty : 0;

  docs = docs.map(serviceorder => {
    return {
      ...serviceorder,
      registerSince: moment(serviceorder.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: serviceorder.cnpj ? mdiFactory : mdiAccount,
      subtitle: serviceorder.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

const getServices = () => serviceMethods.getRegisters();

const getCustomers = () => customerMethods.getRegisters();

export default {
  getRegisters,
  getRegistersBySearch,
  getServices,
  getCustomers,
};
