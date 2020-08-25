/**
 * @name returnOnlyNumbers
 * @description Return any string received removing special chars
 * @param  {String} str String to replace
 */
function returnOnlyNumbers(str) {
  console.warn('chegou aqui');
  if (!str) return;
  return str.replace(/[^0-9]/g, '');
}

function formatPrice(price, type) {
  if (type === 'data') {
    if (price.includes(',')) {
      const numberSplit = price.toString().split(',');
      let finalPrice = `${numberSplit[0]}.${numberSplit[1]}`;
      finalPrice = parseFloat(finalPrice);
      return finalPrice;
    }
    return parseFloat(price);
  }
  if (Number.isInteger(price)) {
    return `${price},00`;
  }
  const numberSplit = price.toString().split('.');
  let finalPrice;
  if (numberSplit[1].length === 1) {
    finalPrice = `${numberSplit[0]},${numberSplit[1]}0`;
  } else {
    finalPrice = `${numberSplit[0]},${numberSplit[1]}`;
  }
  return finalPrice;
}

export default {
  returnOnlyNumbers,
  formatPrice,
};
