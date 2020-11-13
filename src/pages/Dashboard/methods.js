import api from '../../services/api';
import helper from '../../helpers/helper';

async function getBillings() {
  let result = await api.get('/api/v1/service-order');
  result = result.data.data.serviceOrder.filter(
    x => x.paymentDate && x.paymentValue >= 0
  );
  let finalResult = result.reduce((a, b) => a + b.paymentValue, 0);
  finalResult = helper.formatPrice(finalResult);
  return finalResult;
}

async function getServiceOrders() {
  const count = await api.get('/api/v1/service-order-count');
  return count;
}

export const getCustomers = async () => {
  const count = await api.get('/api/v1/customers-count');
  return count;
};

async function getAttachments() {
  const count = await api.get('/api/v1/attachments-count');
  return count;
}

export { getBillings, getServiceOrders, getAttachments };
