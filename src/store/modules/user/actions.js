export function setProfile(profileInfo) {
  return {
    type: '@profile/SET_PROFILE_INFO',
    payload: { profileInfo },
  };
}
