export const UPLOAD_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://my-app.com' : 'http://localhost:5000';
export const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://my-app.com/api' : 'http://localhost:5000/api';
