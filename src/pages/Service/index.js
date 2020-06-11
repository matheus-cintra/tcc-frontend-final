import React from 'react';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import { Toolbar, ServiceTitle, ServiceList } from './styles';

export default function Service() {
  return (
    <>
      <Toolbar>
        <ServiceTitle>
          Serviços
          <button type="button">
            <Icon
              path={mdiPlusCircle}
              title="Adicionar Serviço"
              size="30px"
              color="#fff"
            />
          </button>
        </ServiceTitle>
      </Toolbar>
      <ServiceList>
        <li>
          <button type="button">
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
      </ServiceList>
    </>
  );
}
