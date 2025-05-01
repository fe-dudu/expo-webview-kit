import type { paths as ApiType } from './api';
import type { DeletePath, GetPath, PatchPath, PostPath, PutPath } from './path';

type Response<T, Method extends 'get' | 'put' | 'post' | 'delete' | 'patch'> = {
  [K in keyof T]: T[K] extends {
    [method in Method]: {
      responses: { 200: { content: { 'application/json': infer R } } };
    };
  }
    ? R
    : never;
};

export type GetResponse<T extends GetPath> = Response<ApiType, 'get'>[T];

export type PutResponse<T extends PutPath> = Response<ApiType, 'put'>[T];

export type PostResponse<T extends PostPath> = Response<ApiType, 'post'>[T];

export type DeleteResponse<T extends DeletePath> = Response<ApiType, 'delete'>[T];

export type PatchResponse<T extends PatchPath> = Response<ApiType, 'patch'>[T];
