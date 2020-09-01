import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'sismei',
      storage,
      whitelist: ['auth', 'user', 'modules', 'company'],
    },
    reducers
  );

  return persistedReducer;
};
