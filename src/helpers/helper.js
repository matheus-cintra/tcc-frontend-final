/**
 * @name returnOnlyNumbers
 * @description Return any string received removing special chars
 * @param  {String} str String to replace
 */
function returnOnlyNumbers(str) {
  if (!str) return;
  return str.replace(/[^0-9]/g, '');
}

export default {
  returnOnlyNumbers,
};
