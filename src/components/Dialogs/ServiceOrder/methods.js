import * as Yup from 'yup';
import moment from 'moment-timezone';
// import momentTimezone from '';
import 'moment/locale/pt-br';
import { toast } from 'react-toastify';
import helpers from '../../../helpers/helper';
import api from '../../../services/api';

moment.locale('pt-br');

const schema = Yup.object().shape({
  customerContact: Yup.string(),
  serviceBasePrice: Yup.string(),
  serviceFinalPrice: Yup.string(),
  serviceDate: Yup.string(),
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

async function submit(
  form,
  setSubmitting,
  formRef,
  serviceOrderId,
  handleClose
) {
  form.data.customerName = form.customer.name;
  form.data.serviceName = form.service.name;

  setSubmitting(true);

  try {
    formRef.current.setErrors({});
    await schema.validate(form.data, {
      abortEarly: false,
    });

    const _serviceDate =
      form.data.dateService &&
      moment(form.data.serviceDate).utc().tz('America/Sao_Paulo').endOf('day');

    const _paymentDate =
      form.data.paymentDate &&
      moment(form.data.serviceDate).utc().tz('America/Sao_Paulo').endOf('day');

    const _finalPrice = helpers.formatPrice(form.data.finalPrice, 'data');
    const _paymentValue = helpers.formatPrice(form.data.paymentValue, 'data');
    const _basePrice = helpers.formatPrice(form.data.basePrice, 'data');

    if (_serviceDate && !_serviceDate.isValid()) throw new Error();
    if (_paymentDate && !_paymentDate.isValid()) throw new Error();
    // if (_finalPrice === '') _finalPrice = 0;
    // if (_paymentValue === '') _paymentValue = 0;

    const ds = {
      customerId: form.customer._id,
      serviceId: form.service._id,
      basePrice: _basePrice,
      finalPrice: _finalPrice,
      executionDate: _serviceDate,
      description: form.data.description,
      paymentMethod: form.data.paymentMethod,
      paymentDate: _paymentDate,
      paymentValue: _paymentValue,
    };

    const result = serviceOrderId
      ? await api.put(`/api/v1/service-order/${serviceOrderId}`, {
          ...ds,
        })
      : await api.post('/api/v1/service-order/', { ...ds });

    if (!result.data.success) {
      return toast.error('Eror ao atualizar cliente.');
    }

    if (serviceOrderId) {
      toast.success('Ordem de Serviço Atualizada.');
    } else {
      toast.success('Ordem de Serviço Criada.');
    }

    handleClose();
  } catch (error) {
    setSubmitting(false);
    if (error instanceof Yup.ValidationError) {
      const errorMessages = {};

      error.inner.forEach(err => {
        errorMessages[err.path] = err.message;
      });

      formRef.current.setErrors(errorMessages);
    } else {
      return toast.error(
        (error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.message) ||
          'Erro na Validação dos dados.'
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
