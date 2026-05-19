import {
  deleteRequest, get, post, put,
} from '../axiosInstance';
import { Params } from '../utils';

export const create = (params: { name: string; sector: string; description?: string }) => post('/industries', params);

export const update = (params: { name?: string; sector?: string; description?: string }, id: string) => put(`/industries/${id}`, params);

export const getAll = (params: Params, token?: string) => get('/industries', params, {
  bearerToken: token,
  isFetchToken: !token,
});

export const getById = (id: string, token?: string) => get(`/industries/${id}`, undefined, {
  bearerToken: token,
  isFetchToken: !token,
});

export const deleteIndustry = (id: string) => deleteRequest(`/industries/${id}`);
