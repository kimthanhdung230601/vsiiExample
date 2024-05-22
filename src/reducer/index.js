import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import playerReducer from './ReloadReducer';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['reloadCount']
};

const rootReducer = combineReducers({
  reloadCount: persistReducer(persistConfig, playerReducer)
});

export default rootReducer;
