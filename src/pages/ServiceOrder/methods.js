import moment from 'moment';
import api from '../../services/api';
import helpers from '../../helpers/helper';

/* const paymentMethods = [
  {
    id: 1,
    content: 'TRANSFERÊNCIA',
  },
  {
    id: 2,
    content: 'BOLETO',
  },
  {
    id: 3,
    content: 'DINHEIRO',
  },
  {
    id: 4,
    content: 'CHEQUE',
  },
]; */

async function getServiceOrderList() {
  const result = await api.get('/api/v1/service-order/');
  if (result.data && result.data.data && result.data.data.serviceOrders) {
    let { serviceOrders } = result.data.data;
    serviceOrders = serviceOrders.map(serviceOrder => {
      const _price = helpers.formatPrice(serviceOrder.price);
      /* const _paymentMethod = paymentMethods.find(
        x => x.id === serviceOrder.paymentMethod
      ); */
      return {
        ...serviceOrder,
        serviceDate: moment(serviceOrder.serviceDate, 'YYYY-MM-DD').format(
          'DD-MM-YYYY'
        ),
        executedDate: moment(serviceOrder.executedDate, 'YYYY-MM-DD').format(
          'DD-MM-YYYY'
        ),
        paymentDate: moment(serviceOrder.paymentDate, 'YYYY-MM-DD').format(
          'DD-MM-YYYY'
        ),
        formatedPrice: _price,
      };
    });

    console.warn('Passou aqui', serviceOrders);

    return serviceOrders;
  }
}

export default {
  getServiceOrderList,
};
