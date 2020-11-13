import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import {
  mdiReceipt,
  mdiFile,
  mdiAccountSupervisor,
  mdiAttachment,
} from '@mdi/js';
import {
  getAttachments,
  getBillings,
  getCustomers,
  getServiceOrders,
} from './methods';

import {
  Container,
  BillingTotal,
  ServiceOrderTotal,
  CustomerTotal,
  DocumentsTotal,
  InfoContainer,
  BigNumber,
  NormalText,
} from './styles';

function Dashboard() {
  const [billings, setBillings] = useState('');
  const [serviceOrders, setServiceOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [attachments, setAttachments] = useState(0);

  async function getDashboardInfo() {
    const resultCustomer = await getCustomers();
    const resultAttachments = await getAttachments();
    const resultServiceOrders = await getServiceOrders();
    const resultBilling = await getBillings();
    setBillings(resultBilling);
    setCustomers(resultCustomer.data.data.customer);
    setAttachments(resultAttachments.data.data.attachment);
    setServiceOrders(resultServiceOrders.data.data.serviceOrder);
  }

  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <Container>
      <BillingTotal>
        <Icon
          path={mdiReceipt}
          title="Faturamento Total"
          size={4}
          color="#455a64"
        />
        <InfoContainer>
          <BigNumber>R${billings}</BigNumber>
          <NormalText>Faturamento</NormalText>
        </InfoContainer>
      </BillingTotal>
      <ServiceOrderTotal>
        <Icon
          path={mdiFile}
          title="Ordens de Serviço Executadas"
          size={4}
          color="#455a64"
        />
        <InfoContainer>
          <BigNumber size={72}>{serviceOrders}</BigNumber>
          <NormalText>Ordens de Serviço Executadas</NormalText>
        </InfoContainer>
      </ServiceOrderTotal>
      <CustomerTotal>
        <Icon
          path={mdiAccountSupervisor}
          title="Clientes"
          size={4}
          color="#455a64"
        />
        <InfoContainer>
          <BigNumber size={72}>{customers}</BigNumber>
          <NormalText>Total de Clientes</NormalText>
        </InfoContainer>
      </CustomerTotal>
      <DocumentsTotal>
        <Icon path={mdiAttachment} title="Anexos" size={4} color="#455a64" />
        <InfoContainer>
          <BigNumber size={72}>{attachments}</BigNumber>
          <NormalText>Anexos Totais</NormalText>
        </InfoContainer>
      </DocumentsTotal>
    </Container>
  );
}

export default Dashboard;
