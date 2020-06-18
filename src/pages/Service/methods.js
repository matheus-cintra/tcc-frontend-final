import api from '../../services/api';
import helpers from '../../helpers/helper';

async function getServiceList() {
  const result = await api.get('/api/v1/registration-service/');

  if (result.data && result.data.data && result.data.data.services) {
    let { services } = result.data.data;
    services = services.map(service => {
      const _price = helpers.formatPrice(service.price);
      return {
        ...service,
        formatedPrice: _price,
      };
    });

    return services;
  }
}

export default {
  getServiceList,
};
