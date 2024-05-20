import { sendDelete, sendGet, sendPost, sendPut } from './api';

export const getListData = () => sendGet(`/example`);
export const updateData = (payload: any, param: string) =>
  sendPost(`/example/${param}`);
