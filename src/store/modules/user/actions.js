export function setProfile(profileInfo) {
  console.warn('TA NO ACTION > ', profileInfo);
  return {
    type: '@profile/SET_PROFILE_INFO',
    payload: { profileInfo },
  };
}
