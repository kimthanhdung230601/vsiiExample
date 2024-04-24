import { sendDelete, sendGet, sendPost, sendPut } from './api';

export const getListData = () => sendGet(`/example`);
