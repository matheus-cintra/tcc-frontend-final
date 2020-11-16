import produce from 'immer';

const INITIAL_STATE = {
  moduleName: null,
  moduleApi: null,
  hasSearchBar: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@modules/SET_MODULE': {
      return produce(state, draft => {
        draft.moduleName = action.payload.moduleName;
        draft.moduleApi = action.payload.moduleApi;
        draft.hasSearchBar = action.payload.hasSearchBar;
      });
    }

    case '@auth/LOGOUT_USER': {
      return produce(state, draft => {
        draft.moduleName = null;
        draft.moduleApi = null;
        draft.hasSearchBar = null;
      });
    }

    default:
      return state;
  }
}
