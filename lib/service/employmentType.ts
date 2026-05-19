import {
  deleteRequest, get, post, put,
} from '../axiosInstance';
import { Params } from '../utils';

export const create = (params: { name: string; description?: string }) => post('/employment-types', params);

export const update = (params: { name: string; description?: string }, id: string) => put(`/employment-types/${id}`, params);

export const getAll = (params: Params, token?: string) => get('/employment-types', params, {
  bearerToken: token,
  isFetchToken: !token,
});

export const getById = (id: string, token?: string) => get(`/employment-types/${id}`, undefined, {
  bearerToken: token,
  isFetchToken: !token,
});

export const deleteEmploymentType = (id: string) => deleteRequest(`/employment-types/${id}`);
