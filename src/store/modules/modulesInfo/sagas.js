import { takeLatest, put, all } from 'redux-saga/effects';
import { setModules } from './actions';

export function* setModuleInfo({ payload }) {
  const { moduleName, moduleApi, hasSearchBar } = payload.moduleDefinition;
  yield put(setModules(moduleName, moduleApi, hasSearchBar));
}

export default all([takeLatest('@modules/SET_MODULE_INFO', setModuleInfo)]);
