import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import playerReducer from './ReloadReducer';
import localStorage from 'redux-persist/es/storage';

export const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['reloadCount']
};

const rootReducer = combineReducers({
  reloadCount: persistReducer(persistConfig, playerReducer)
});

export default rootReducer;
