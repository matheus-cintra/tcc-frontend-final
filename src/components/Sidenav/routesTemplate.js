import {
  mdiViewDashboard,
  mdiAccountSupervisor,
  mdiBriefcaseAccount,
  mdiBadgeAccount,
} from '@mdi/js';

const routes = [
  {
    icon: mdiViewDashboard,
    title: 'Dashboard',
    size: 1,
    color: '#fff',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    icon: mdiAccountSupervisor,
    title: 'Clientes',
    size: 1,
    color: '#fff',
    name: 'Clientes',
    route: '/customer',
  },
  {
    icon: mdiBriefcaseAccount,
    title: 'Serviços',
    size: 1,
    color: '#fff',
    name: 'Serviços',
    route: '/service',
  },
];

export default routes;
