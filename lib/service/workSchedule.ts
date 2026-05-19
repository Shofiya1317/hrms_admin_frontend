import {
  deleteRequest, get, post, put,
} from '../axiosInstance';
import { Params } from '../utils';

export const create = (params: object) => post('/work-schedules', params);

export const update = (params: object, id: string) => put(`/work-schedules/${id}`, params);

export const getAll = (params?: Params, token?: string) => get('/work-schedules', params, {
  bearerToken: token,
  isFetchToken: !token,
});

export const getById = (id: string, token?: string) => get(`/work-schedules/${id}`, undefined, {
  bearerToken: token,
  isFetchToken: !token,
});

export const deleteWorkSchedule = (id: string) => deleteRequest(`/work-schedules/${id}`);

export const restore = (id: string) => put(`/work-schedules/${id}/restore`, {});
