import {
  mdiViewDashboard,
  mdiAccountSupervisor,
  mdiBriefcaseAccount,
  mdiFactory,
  mdiBriefcase,
  mdiFile,
  mdiReceipt,
  mdiAttachment,
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
    icon: mdiFactory,
    title: 'Empresa',
    size: 1,
    color: '#fff',
    name: 'Empresa',
    route: '/my-company',
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
  {
    icon: mdiBriefcase,
    title: 'Fornecedores',
    size: 1,
    color: '#fff',
    name: 'Fornecedores',
    route: '/providers',
  },
  {
    icon: mdiFile,
    title: 'Ordens de Serviço',
    size: 1,
    color: '#fff',
    name: 'Ordens de Serviço',
    route: '/service-order',
  },
  {
    icon: mdiReceipt,
    title: 'Notas Fiscais',
    size: 1,
    color: '#fff',
    name: 'Notas Fiscais',
    route: '/billing',
  },
  {
    icon: mdiAttachment,
    title: 'Anexos',
    size: 1,
    color: '#fff',
    name: 'Anexos',
    route: '/attachments',
  },
];

export default routes;
