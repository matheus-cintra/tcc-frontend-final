import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  imageLink: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS': {
      console.warn('action >>>> ', action);
      return produce(state, draft => {
        draft.profile = action.payload.user;
        draft.imageLink = action.payload.user.imageLink;
      });
    }

    case '@profile/SET_PROFILE_INFO': {
      console.warn('action >>>> ', action.payload);
      return produce(state, draft => {
        draft.imageLink = action.payload.profileInfo.imageLink;
      });
    }

    default:
      return state;
  }
}
