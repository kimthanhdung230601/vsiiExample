import Axios from 'axios';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: `https://64380678894c9029e8cca33d.mockapi.io/api/products`
});
export const sendGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params }).then((res: any) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res: any) => res.data);
export const sendPut = (url: string, params?: any) =>
  axiosInstance.put(url, params).then((res: any) => res.data);
export const sendPatch = (url: string, params?: any) =>
  axiosInstance.patch(url, params).then((res: any) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { params }).then((res: any) => res.data);
