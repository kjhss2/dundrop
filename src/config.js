export const API_SERVER = process.env.NODE_ENV === 'production'
  ? 'http://localhost:8080'
  : 'http://localhost:8080';

export const VERSION = '/dundrop';

export const API_SERVER_BASE_URL = API_SERVER + VERSION;