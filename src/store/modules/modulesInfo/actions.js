export function setModuleInfo(moduleDefinition) {
  return {
    type: '@modules/SET_MODULE_INFO',
    payload: { moduleDefinition },
  };
}

export function setModules(moduleName, moduleApi, hasSearchBar) {
  return {
    type: '@modules/SET_MODULE',
    payload: { moduleName, moduleApi, hasSearchBar },
  };
}
