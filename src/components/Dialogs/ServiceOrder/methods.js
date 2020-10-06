import * as Yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import helpers from '../../../helpers/helper';

const schema = Yup.object().shape({
  customerContact: Yup.string(),
  serviceBasePrice: Yup.string(),
  serviceFinalPrice: Yup.string(),
  serviceDate: Yup.date(),
  serviceDescription: Yup.string(),
  paymentMethod: Yup.string(),
  paymentDate: Yup.string(),
  paymentValue: Yup.string(),
});

function getSuggestions(value, itemArray) {
  let escapedValue = helpers.escapeRegexCharacters(value.trim());

  escapedValue = helpers.normalize(escapedValue, 'lower');

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(`.*${escapedValue}`, 'i');

  return itemArray.filter(item => regex.test(item._idxName));
}

function clearSuggestions(clearAutoComplete) {
  clearAutoComplete([]);
}

function autocompleteChange(value, setSelected, setInput) {
  if (value === '') setSelected({});
  setInput(value);
}

function filterArray(value, itemArray, selReg, setNoReg, setAutoComplete) {
  if (value === selReg.name) return;
  const suggestions = getSuggestions(value, itemArray);
  const isInputBlank = value.trim() === '';
  setNoReg(!isInputBlank && suggestions.length === 0);
  setAutoComplete(suggestions);
}

function selectSuggestion(suggestion, setReg, formRef, name) {
  setReg(suggestion);
  formRef.current.setFieldValue([name], suggestion.name);
}

async function submit(form, setSubmitting, formRef) {
  form.data.customerName = form.customer.name;
  form.data.serviceName = form.service.name;

  setSubmitting(true);

  try {
    formRef.current.setErrors({});
    await schema.validate(form.data, {
      abortEarly: false,
    });

    const _serviceDate =
      form.data.dateService && moment(form.data.dateService, 'DD/MM/YYYY');
    const _paymentDate =
      form.data.paymentDate && moment(form.data.paymentDate, 'DD/MM/YYYY');

    let _finalPrice = helpers.returnOnlyNumbers(form.data.finalPrice);
    let _paymentValue = helpers.returnOnlyNumbers(form.data.paymentValue);

    if (_serviceDate && !_serviceDate.isValid()) throw new Error();
    if (_paymentDate && !_paymentDate.isValid()) throw new Error();
    if (_finalPrice === '') _finalPrice = 0;
    if (_paymentValue === '') _paymentValue = 0;

    //     const result = serviceOrderId
    //       ? await api.put(`/api/v1/serviceOrders/${serviceOrderId}`, { ...data })
    //       : await api.post('/api/v1/serviceOrders/', { ...data });
  } catch (error) {
    setSubmitting(false);
    if (error instanceof Yup.ValidationError) {
      const errorMessages = {};

      error.inner.forEach(err => {
        errorMessages[err.path] = err.message;
      });

      formRef.current.setErrors(errorMessages);
    } else {
      console.warn('ERROR > ', error);
      return toast.error(
        (error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.message) ||
          'Erro desconhecido'
      );
    }
  }
}

export {
  getSuggestions,
  clearSuggestions,
  autocompleteChange,
  filterArray,
  selectSuggestion,
  submit,
};
