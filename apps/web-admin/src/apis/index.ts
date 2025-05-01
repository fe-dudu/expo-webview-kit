import { apiMiddleware } from '@expo-webview-kit/api/apiMiddleware';
import { client } from '@expo-webview-kit/api/client';

/**
 * @throws BaseApiError
 */
const API = client(import.meta.env.VITE_ENV);
API.use(apiMiddleware);

export { API };
