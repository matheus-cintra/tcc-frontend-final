export function setCompanyInfo(companyInfo) {
  return {
    type: '@company/SET_COMPANY_INFO',
    payload: { companyInfo },
  };
}

export function setCompany(companyName, companyImage) {
  return {
    type: '@company/SET_COMPANY',
    payload: { companyName, companyImage },
  };
}
