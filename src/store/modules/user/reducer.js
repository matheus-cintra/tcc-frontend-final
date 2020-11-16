import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  imageLink: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS': {
      return produce(state, draft => {
        draft.profile = action.payload.user;
        draft.imageLink = action.payload.user.imageLink;
      });
    }

    case '@profile/SET_PROFILE_INFO': {
      return produce(state, draft => {
        draft.profile = action.payload.profileInfo.user;
        draft.imageLink = action.payload.profileInfo.imageLink;
      });
    }

    case '@auth/LOGOUT_USER': {
      return produce(state, draft => {
        draft.profile = null;
        draft.imageLink = null;
      });
    }

    default:
      return state;
  }
}
