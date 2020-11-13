import moment from 'moment';
import { mdiFile } from '@mdi/js';
import api from '../../services/api';

async function getRegisters(limit = undefined, skip = undefined) {
  let uri;

  if (limit && skip) {
    uri = `/api/v1/attachments-module?limit=${limit}&skip=${skip}`;
  } else if (limit && !skip) {
    uri = `/api/v1/attachments-module?limit=${limit}`;
  } else if (!limit && skip) {
    uri = `/api/v1/attachments-module?skip=${skip}`;
  } else {
    uri = `/api/v1/attachments-module`;
  }

  const result = await api.get(uri);

  let docs = result.data.success ? result.data.data.documents : [];
  const docCount = result.data.success ? result.data.data.qty : 0;

  docs = docs.map(attachment => {
    return {
      ...attachment,
      registerSince: moment(attachment.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: mdiFile,
      subtitle: 'Anexos',
    };
  });

  return { docs, docCount };
}

async function getRegistersBySearch(search) {
  const result = await api.get(
    `/api/v1/get-attachment-module-by-search/${search}`
  );

  let docs = result.data.success ? result.data.documents : [];
  const docCount =
    result.data.success && result.data.qty > 0 ? result.data.qty : 0;

  docs = docs.map(attachment => {
    return {
      ...attachment,
      registerSince: moment(attachment.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: mdiFile,
      subtitle: 'Anexos',
    };
  });

  return { docs, docCount };
}

export default {
  getRegisters,
  getRegistersBySearch,
};
