import {
  deleteRequest, get, patch, post,
} from '../axiosInstance';
import { Params } from '../utils';

export const create = (params: object) => post('/leave-types', params);

export const update = (params: object, id: string) => patch(`/leave-types/${id}`, params);

export const getAll = (params?: Params, token?: string) => get('/leave-types', params, {
  bearerToken: token,
  isFetchToken: !token,
});

export const getActive = (token?: string) => get('/leave-types/active', undefined, {
  bearerToken: token,
  isFetchToken: !token,
});

export const getById = (id: string, token?: string) => get(`/leave-types/${id}`, undefined, {
  bearerToken: token,
  isFetchToken: !token,
});

export const getByCode = (code: string, token?: string) => get(`/leave-types/code/${code}`, undefined, {
  bearerToken: token,
  isFetchToken: !token,
});

export const deleteLeaveType = (id: string) => deleteRequest(`/leave-types/${id}`);
