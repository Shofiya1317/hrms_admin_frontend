import {
  deleteRequest, get, post, put,
} from '../axiosInstance';
import { Params } from '../utils';

export const create = (params: object) => post('/shifts', params);

export const update = (params: object, id: string) => put(`/shifts/${id}`, params);

export const getAll = (params: Params, token?: string) => get('/shifts', params, {
  bearerToken: token,
  isFetchToken: !token,
});

export const getById = (id: string, token?: string) => get(`/shifts/${id}`, undefined, {
  bearerToken: token,
  isFetchToken: !token,
});

export const deleteShift = (id: string) => deleteRequest(`/shifts/${id}`);
