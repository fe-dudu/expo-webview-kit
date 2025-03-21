import createClient from 'openapi-fetch';
import type { paths } from '../types/api';
import type { Environment } from '../types/env';

const URLS: Record<Environment, string> = {
  dev: 'https://dev-api.example.com',
  prod: 'https://api.example.com',
} as const;

export const client = (env: Environment) => createClient<paths>({ baseUrl: URLS[env] });
