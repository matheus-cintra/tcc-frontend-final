import produce from 'immer';

const INITIAL_STATE = {
  companyName: null,
  companyImage: null,
};

export default function company(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@company/SET_COMPANY': {
      return produce(state, draft => {
        draft.companyName = action.payload.companyName;
        draft.companyImage = action.payload.companyImage;
      });
    }

    default:
      return state;
  }
}
