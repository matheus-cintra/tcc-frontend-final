import helper from '../../../helpers/helper';

export function handleDispatchEvents(current = {}, addressResult) {
  const event = new Event('focus');

  const nameEl = document.getElementById('name');
  nameEl.dispatchEvent(event);

  const inputCpfEl = document.getElementById('inputCpf');
  if (inputCpfEl) inputCpfEl.dispatchEvent(event);

  const inputCnpjEl = document.getElementById('inputCnpj');
  if (inputCnpjEl) inputCnpjEl.dispatchEvent(event);

  const inputPhoneEl = document.getElementById('inputPhone');
  if (current.phone && helper.returnOnlyNumbers(current.phone) !== '')
    inputPhoneEl.dispatchEvent(event);

  const inputEmailEl = document.getElementById('inputEmail');
  if (current.email && current.email !== '') inputEmailEl.dispatchEvent(event);

  const descriptionEl = document.getElementById('description');
  if (current.description && current.description !== '')
    descriptionEl.dispatchEvent(event);

  const cepEl = document.getElementById('cep');
  if ((current.address && current.address.cep) || addressResult) {
    cepEl.dispatchEvent(event);
  }

  const addressEl = document.getElementById('address');
  if ((current.address && current.address.address) || addressResult)
    addressEl.dispatchEvent(event);

  const numberEl = document.getElementById('number');
  if (current.address && current.address.number) numberEl.dispatchEvent(event);

  const neighborhoodEl = document.getElementById('neighborhood');
  if ((current.address && current.address.neighborhood) || addressResult)
    neighborhoodEl.dispatchEvent(event);

  const additionalEl = document.getElementById('additional');
  if (current.address && current.address.additional)
    additionalEl.dispatchEvent(event);

  const cityEl = document.getElementById('city');
  if ((current.address && current.address.city) || addressResult)
    cityEl.dispatchEvent(event);

  const stateEl = document.getElementById('state');
  if ((current.address && current.address.state) || addressResult)
    stateEl.dispatchEvent(event);
}
