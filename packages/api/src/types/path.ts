import type { paths as ApiType } from './api';

type MethodPath<T, Method extends string> = {
  [K in keyof T]: T[K] extends { [M in Method]: unknown } ? K : never;
}[keyof T];

export type GetPath = MethodPath<ApiType, 'get'>;

export type PutPath = MethodPath<ApiType, 'put'>;

export type PostPath = MethodPath<ApiType, 'post'>;

export type DeletePath = MethodPath<ApiType, 'delete'>;

export type PatchPath = MethodPath<ApiType, 'patch'>;
