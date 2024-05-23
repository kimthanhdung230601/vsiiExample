import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
