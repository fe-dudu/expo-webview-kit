import type { paths as ApiTypes } from './api';

type ResponseDataType<T, Method extends 'get' | 'post'> = {
  [K in keyof T]: T[K] extends {
    [method in Method]: {
      responses: { 200: { content: { 'application/json': infer R } } };
    };
  }
    ? R
    : never;
};
type GetResponseDataType<T> = ResponseDataType<T, 'get'>;
type PostResponseDataType<T> = ResponseDataType<T, 'post'>;

export type ApiGetResponseTypes<T extends keyof ApiTypes> = GetResponseDataType<ApiTypes>[T];
export type ApiPostResponseTypes<T extends keyof ApiTypes> = PostResponseDataType<ApiTypes>[T];
