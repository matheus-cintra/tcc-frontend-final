import React from 'react';
import Icon from '@mdi/react';
import { Toolbar, ServiceTitle, ServiceList } from './styles';
import { mdiPlusCircle } from '@mdi/js';

export default function Service() {
  return (
    <>
      <Toolbar>
        <ServiceTitle>
          Serviços
          <button>
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
          <button>
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button>
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button>
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button>
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
        <li>
          <button>
            <span>Serviço ABC - R$1789,00</span>
          </button>
        </li>
      </ServiceList>
    </>
  );
}
