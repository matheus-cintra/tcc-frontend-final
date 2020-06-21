import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import ServiceDialog from '../../components/Dialogs/Service/ServiceDialog';
import methods from './methods';

export default function Service() {
  const [working, setWorking] = useState(false);
  const [serviceList, setServicesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState({});

  const getServices = async () => {
    if (open) return;

    const services = await methods.getServiceList();
    setServicesList(services);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getServices();
  }, []);

  useEffect(() => {
    if (working) return;
    getServices();
  }, [open]);

  const handleOpen = service => {
    setCurrentService(service);
    setOpen(current => !current);
  };

  const handleServiceEdit = () => {
    return <ServiceDialog setOpen={setOpen} current={currentService} />;
  };

  return (
    <>
      <DefaultList
        title="Services"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Serviço"
        working={working}
        itemList={serviceList}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleServiceEdit()}</div>
      </Modal>
    </>
  );
}

/** ************************** Não apagar por enquanto ************************ */

// <Toolbar>
//         <ServiceTitle>
//           Serviços
//           <button type="button" onClick={handleOpen}>
//             <Icon
//               path={mdiPlusCircle}
//               title="Adicionar Serviço"
//               size="30px"
//               color="#fff"
//             />
//           </button>
//         </ServiceTitle>
//       </Toolbar>
// {!working && serviceList.length > 0 ? (
//   <Scroll>
//     <ServiceList>
//       {serviceList.map(service => (
//         <li key={service._id}>
//           <button type="button" onClick={() => handleOpen(service)}>
//             <SpanContainer>
//               <span>
//                 {service.code} - {service.name}
//               </span>
//               <span>{service.description}</span>
//             </SpanContainer>
//             <span>R$ {service.formatedPrice}</span>
//           </button>
//         </li>
//       ))}
//     </ServiceList>
//   </Scroll>
// ) : null}
