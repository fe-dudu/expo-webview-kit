import createClient from 'openapi-fetch';
import type { paths as ApiType } from '../types/api';
import type { Environment } from '../types/env';

const URLS: Record<Environment, string> = {
  dev: 'https://dev-api.example.com/swagger.json',
  test: 'https://test-api.example.com/swagger.json',
  prod: 'https://api.example.com/swagger.json',
} as const;

export const client = (env: Environment) => createClient<ApiType>({ baseUrl: URLS[env] });
