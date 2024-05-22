import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

export const persistor = persistStore(store);
