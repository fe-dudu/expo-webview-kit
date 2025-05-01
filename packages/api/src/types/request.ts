import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import type { paths as ApiType } from './api';
import type { DeletePath, GetPath, PatchPath, PostPath, PutPath } from './path';

type Request<T extends keyof ApiType, Method extends 'get' | 'put' | 'post' | 'delete' | 'patch'> = ParamsOption<
  ApiType[T][Method]
> &
  RequestBodyOption<ApiType[T][Method]>;

export type GetRequest<T extends GetPath> = Request<T, 'get'>;

export type PutRequest<T extends PutPath> = Request<T, 'put'>;

export type PostRequest<T extends PostPath> = Request<T, 'post'>;

export type DeleteRequest<T extends DeletePath> = Request<T, 'delete'>;

export type PatchRequest<T extends PatchPath> = Request<T, 'patch'>;
