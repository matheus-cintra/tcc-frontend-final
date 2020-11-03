import moment from 'moment-timezone';
import {
  mdiFactory,
  mdiAccount,
  mdiCheck,
  mdiAlertCircleOutline,
} from '@mdi/js';
import api from '../../services/api';
import serviceMethods from '../Service/methods';
import customerMethods from '../Customer/methods';
import helpers from '../../helpers/helper';

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
      basePrice: helpers.formatPrice(serviceorder.basePrice),
      finalPrice: helpers.formatPrice(serviceorder.finalPrice),
      paymentValue:
        serviceorder.paymentValue &&
        helpers.formatPrice(serviceorder.paymentValue),
      name: serviceorder.customer[0].name,
      registerSince:
        serviceorder.createdAt &&
        moment(serviceorder.createdAt, 'YYYY-MM-DD')
          .tz('America/Sao_Paulo')
          .endOf('day')
          .format('DD/MM/YYYY'),
      executionDate:
        serviceorder.executionDate &&
        moment(serviceorder.executionDate, 'YYYY-MM-DD')
          .tz('America/Sao_Paulo')
          .endOf('day')
          .format('DD/MM/YYYY'),
      paymentDate:
        serviceorder.paymentDate &&
        moment(serviceorder.paymentDate, 'YYYY-MM-DD')
          .tz('America/Sao_Paulo')
          .endOf('day')
          .format('DD/MM/YYYY'),
      icon: serviceorder.customer[0].cnpj ? mdiFactory : mdiAccount,
      subtitle: serviceorder.cnpj ? 'Jurídica' : 'Física',
      formatedPrice:
        serviceorder.paymentValue &&
        helpers.formatPrice(serviceorder.paymentValue),
      statusPaid: serviceorder.paymentValue ? mdiCheck : mdiAlertCircleOutline,
    };
  });

  // console.warn('docs > ', moment(docs[0].executionDate).valueOf());

  // docs = docs.sort(

  // );

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
      basePrice: helpers.formatPrice(serviceorder.basePrice),
      finalPrice: helpers.formatPrice(serviceorder.finalPrice),
      paymentValue:
        serviceorder.paymentValue &&
        helpers.formatPrice(serviceorder.paymentValue),
      name: serviceorder.customer[0].name,
      registerSince: moment(serviceorder.createdAt, 'YYYY-MM-DD')
        .tz('America/Sao_Paulo')
        .endOf('day')
        .format('DD/MM/YYYY'),
      executionDate: moment(serviceorder.executionDate, 'YYYY-MM-DD')
        .tz('America/Sao_Paulo')
        .endOf('day')
        .format('DD/MM/YYYY'),
      paymentDate: moment(serviceorder.paymentDate, 'YYYY-MM-DD')
        .tz('America/Sao_Paulo')
        .endOf('day')
        .format('DD/MM/YYYY'),
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
