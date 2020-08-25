import api from '../../services/api';
import helpers from '../../helpers/helper';

async function getServiceOrderList() {
  const result = await api.get('/api/v1/service-order/');

  if (result.data && result.data.data && result.data.data.serviceOrders) {
    let { serviceOrders } = result.data.data;
    serviceOrders = serviceOrders.map(serviceOrder => {
      const _price = helpers.formatPrice(serviceOrder.price);
      return {
        ...serviceOrder,
        formatedPrice: _price,
      };
    });

    return serviceOrders;
  }
}

export default {
  getServiceOrderList,
};
